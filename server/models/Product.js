import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, trim: true, default: "USD" },
    category: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    images: {
      type: [{ type: String, trim: true }],
      required: true,
      validate: {
        validator: (images) => images.length >= 1 && images.length <= 5,
        message: "A product must have between 1 and 5 images",
      },
    },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
