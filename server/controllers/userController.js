import User from "../models/User.js";

const errorWithStatus = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const listUsers = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) {
      filter.$or = [
        { id: { $regex: req.query.search, $options: "i" } },
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const users = await User.find(filter).sort({ joined: 1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) throw errorWithStatus("User not found", 404);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create({
      id: req.body.id || `u-${Date.now()}`,
      name: req.body.name,
      email: req.body.email,
      joined: req.body.joined || new Date(),
      orders: req.body.orders || 0,
      spent: req.body.spent || 0,
      status: req.body.status || "active",
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true, omitUndefined: true }
    );
    if (!user) throw errorWithStatus("User not found", 404);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    if (!["active", "blocked"].includes(req.body.status)) {
      throw errorWithStatus("Status must be active or blocked", 400);
    }
    const user = await User.findOneAndUpdate(
      { id: req.params.id },
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!user) throw errorWithStatus("User not found", 404);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ id: req.params.id });
    if (!user) throw errorWithStatus("User not found", 404);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
