import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    userId: { type: String, trim: true, default: null },
    message: { type: String, required: true, trim: true, minlength: 1 },
    read: { type: Boolean, default: false },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
