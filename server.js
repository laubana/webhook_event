const mongoose = require("mongoose");
const express = require("express");
require("./config/db").db();
const cors = require("cors");
const app = express();
app.use(cors(require("./config/cors").cors));
app.use(express.json());
const Group = require("../model/Group");

app.post("/webhook", express.json({ type: "application/json" }), (req, res) => {
  const event = req.body;

  console.log(event);

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

mongoose.connection.on("error", () => {
  console.log("Failed to connect to DB.");
});

mongoose.connection.once("open", () => {
  app.listen(process.env.PORT, () => {
    console.log(`PORT : ${process.env.PORT}`);
  });
});
