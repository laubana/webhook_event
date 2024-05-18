const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    isActive: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("event", eventSchema, "event");
