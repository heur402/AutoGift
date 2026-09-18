import mongoose from "mongoose";

const walletTransactionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true, index: true },
    type: { type: String, enum: ["deposit", "withdrawal"], required: true },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["pending", "completed"], default: "completed" },
  },
  { timestamps: true }
);

export default mongoose.model("WalletTransaction", walletTransactionSchema);
