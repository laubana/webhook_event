const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      require: true,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("thread", threadSchema, "thread");
