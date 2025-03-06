import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  nonce: { type: String, default: () => Math.floor(Math.random() * 1000000).toString() },
}, {
  timestamps: true,
});

export const User = mongoose.model("User", userSchema);