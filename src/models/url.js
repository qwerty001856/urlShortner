import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  accessCount: {
    type: Number,
    default: 0,
  },
});

UrlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Url || mongoose.model("Url", UrlSchema);
