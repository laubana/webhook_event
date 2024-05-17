const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "user", required: true },
    status: {
      type: String,
      required: true,
      enum: ["open", "complete", "expired"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "transaction",
  transactionSchema,
  "transaction"
);
