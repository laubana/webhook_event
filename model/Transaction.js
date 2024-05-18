const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    chargeId: { type: String, required: true },
    description: { type: String, required: true },
    receiptUrl: { type: String, required: true },
    user: { type: ObjectId, ref: "user", required: true },
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
