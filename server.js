const mongoose = require("mongoose");
const express = require("express");
require("./config/db").db();
const cors = require("cors");
const app = express();
app.use(cors(require("./config/cors").cors));
app.use(express.json());
const Event = require("./model/Event");

app.post(
  "/webhook",
  // express.json({ type: "application/json" }),
  async (req, res) => {
    const event = req.body;

    console.log(`${event.type} :: ${event.id}`);

    switch (event.type) {
      case "charge.succeeded":
        const eventId = event.data.object.metadata.eventId;

        console.log(`${eventId}`);

        const updatedEvent = await Event.findByIdAndUpdate(eventId, {
          isActive: true,
        })
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
