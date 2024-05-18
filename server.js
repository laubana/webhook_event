const mongoose = require("mongoose");
const express = require("express");
require("./config/db").db();
const cors = require("cors");
const app = express();
app.use(cors(require("./config/cors").cors));
app.use(express.json());
const Event = require("./model/Event");
const Transaction = require("./model/Transaction");

app.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    const event = req.body;

    console.log(`${event.type} :: ${event.id}`);

    switch (event.type) {
      case "checkout.session.completed":
        const transactionId = event.data.object.metadata.transactionId;
        const eventId = event.data.object.metadata.eventId;

        console.log(`${transactionId} :: ${eventId}`);

        const updatedEvent = await Event.findByIdAndUpdate(eventId, {
          isActive: true,
        })
          .lean()
          .exec();

        const updatedTransaction = await Transaction.findByIdAndUpdate(
          transactionId,
          {
            status: "complete",
          }
        )
          .lean()
          .exec();
        break;
      default:
    }

    res.json({ received: true });
  }
);

mongoose.connection.on("error", () => {
  console.log("Failed to connect to DB.");
});

mongoose.connection.once("open", () => {
  app.listen(process.env.PORT, () => {
    console.log(`PORT : ${process.env.PORT}`);
  });
});
