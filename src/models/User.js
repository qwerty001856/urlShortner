"use server";
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, select: false, required: true },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "subscriber"],
  },
  authProviderId: { type: String },
  createdAt: { type: Date, default: Date.now, select: false },
  updatedAt: { type: Date, default: Date.now, select: false },
  deletedAt: { type: Date, default: null, select: false },
});
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
