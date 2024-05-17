const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    category: { type: ObjectId, ref: "category", required: true },
    user: { type: ObjectId, ref: "user", required: true },
    thumbnailUrl: { type: String, required: true },
    imageUrl: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("event", eventSchema, "event");
