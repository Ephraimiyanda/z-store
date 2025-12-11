import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, default: Date.now },
});

// Important: Next.js hot reload fix
export default mongoose.models.User || mongoose.model("User", UserSchema);
