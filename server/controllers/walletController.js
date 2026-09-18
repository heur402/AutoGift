import User from "../models/User.js";
import WalletTransaction from "../models/WalletTransaction.js";

const errorWithStatus = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const createTransaction = async (req, res, next) => {
  try {
    const amount = Number(req.body.amount);
    if (!Number.isFinite(amount) || amount <= 0) throw errorWithStatus("Amount must be greater than zero", 400);
    const user = await User.findOne({ id: req.params.userId });
    if (!user) throw errorWithStatus("User not found", 404);
    if (req.body.type === "withdrawal" && user.balance < amount) throw errorWithStatus("Insufficient balance", 400);
    const change = req.body.type === "deposit" ? { $inc: { balance: amount, deposited: amount } } : { $inc: { balance: -amount, withdrawn: amount } };
    if (!["deposit", "withdrawal"].includes(req.body.type)) throw errorWithStatus("Transaction type is invalid", 400);
    await User.updateOne({ id: user.id }, change);
    const transaction = await WalletTransaction.create({ id: `w-${Date.now()}`, userId: user.id, type: req.body.type, amount });
    res.status(201).json({ transaction, balance: req.body.type === "deposit" ? user.balance + amount : user.balance - amount });
  } catch (error) {
    next(error);
  }
};

export const listTransactions = async (req, res, next) => {
  try {
    res.json(await WalletTransaction.find({ userId: req.params.userId }).sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
};
