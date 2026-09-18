import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    userId: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true, minlength: 1 },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
