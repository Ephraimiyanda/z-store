import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  colors: [String],
  sizes: [String],
  tags: [String],
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
