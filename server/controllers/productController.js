import Product from "../models/Product.js";

const notFound = (message) => {
  const error = new Error(message);
  error.statusCode = 404;
  return error;
};

export const listProducts = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const sortMap = {
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
      rating: { rating: -1 },
      newest: { createdAt: -1 },
    };
    const limit = Number.parseInt(req.query.limit, 10);
    const query = Product.find(filter).sort(sortMap[req.query.sort] || { id: 1 });
    if (Number.isInteger(limit) && limit > 0) query.limit(Math.min(limit, 100));
    const products = await query;
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) throw notFound("Product not found");
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create({
      id: req.body.id || `p-${Date.now()}`,
      name: req.body.name,
      price: req.body.price,
      currency: req.body.currency || "USD",
      category: req.body.category,
      rating: req.body.rating,
      images: req.body.images,
      description: req.body.description,
    });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true, omitUndefined: true }
    );
    if (!product) throw notFound("Product not found");
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });
    if (!product) throw notFound("Product not found");
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
