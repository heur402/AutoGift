import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    phone: { type: String, required: true, trim: true, default: "not provided" },
    passwordHash: { type: String, required: true, default: "legacy-account" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    verified: { type: Boolean, default: false },
    balance: { type: Number, min: 0, default: 0 },
    deposited: { type: Number, min: 0, default: 0 },
    withdrawn: { type: Number, min: 0, default: 0 },
    joined: { type: Date, required: true, default: Date.now },
    orders: { type: Number, min: 0, default: 0 },
    spent: { type: Number, min: 0, default: 0 },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
