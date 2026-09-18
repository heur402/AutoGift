import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const errorWithStatus = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const updateUserTotals = async (userId) => {
  const [summary] = await Order.aggregate([
    { $match: { userId, status: { $ne: "cancelled" } } },
    {
      $group: {
        _id: "$userId",
        orders: { $sum: 1 },
        spent: { $sum: "$amount" },
      },
    },
  ]);

  await User.findOneAndUpdate(
    { id: userId },
    { orders: summary?.orders || 0, spent: summary?.spent || 0 }
  );
};

export const listOrders = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.userId) filter.userId = req.query.userId;
    if (req.query.status) filter.status = req.query.status;
    const orders = await Order.find(filter).sort({ date: -1, id: 1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ id: req.params.id });
    if (!order) throw errorWithStatus("Order not found", 404);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    if (!req.body.userId) throw errorWithStatus("userId is required", 400);
    const user = await User.findOne({ id: req.body.userId });
    if (!user) throw errorWithStatus("User not found", 404);

    let productName = req.body.product;
    let productId = req.body.productId;
    if (req.body.productId) {
      const product = await Product.findOne({ id: req.body.productId });
      if (!product) throw errorWithStatus("Product not found", 404);
      productName = product.name;
      productId = product.id;
      if (req.body.amount === undefined) req.body.amount = product.price;
    }

    if (!productName || !productId) throw errorWithStatus("productId and product are required", 400);
    const order = await Order.create({
      id: req.body.id || `o-${Date.now()}`,
      userId: req.body.userId,
      product: productName,
      productId,
      amount: req.body.amount,
      date: req.body.date || new Date(),
      status: req.body.status || "pending",
    });
    await updateUserTotals(order.userId);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const previous = await Order.findOne({ id: req.params.id });
    if (!previous) throw errorWithStatus("Order not found", 404);

    const order = await Order.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true, omitUndefined: true }
    );
    await updateUserTotals(previous.userId);
    if (order.userId !== previous.userId) await updateUserTotals(order.userId);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { id: req.params.id },
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!order) throw errorWithStatus("Order not found", 404);
    await updateUserTotals(order.userId);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndDelete({ id: req.params.id });
    if (!order) throw errorWithStatus("Order not found", 404);
    await updateUserTotals(order.userId);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};
