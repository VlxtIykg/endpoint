const express = require("express");
const data = require("../data/test.json");
const dbl = require("./database.js");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(helmet());
app.use(express.json());

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/", (request, response) => {
  response.send("Welcome to this awesome API endpoint page!");
});
app.get("/bot", async (request, response) => {
  if (data.bot === null) {
    response.status(504).json({ reason: "Invalid json" });
  }
  response.status(200).json(dbl.getBotStatistics()[0]);
});
app.get("/fuel", async (request, response) => {
  if (data.bot === null) {
    response.status(504).json({ reason: "Invalid server json" });
  }
  response.status(200).json(dbl.getFuelStatistics()[0]);
});

app.get("/status", async (request, response) => {
  if (data.bot === null) {
    response.status(504).json({ reason: "Invalid server json" });
  }
  response.status(200).json(dbl.getAllTables()[0]);
});

app.post("/fuel", async (request, response) => {
  const message = request.body;
  const id = message?.id;
  const amount = message?.amount;
  if (!message) {
    return response
      .status(400)
      .json({ message: "You must include a message in your request." });
  }
  if (message.status !== null && message.status !== undefined) {
    return response
      .status(413)
      .json({
        error: true,
        message: "Did you mean to use /bot api endpoint instead?",
      });
  }
  console.log(message);
  statuses = dbl.postFuelStatistics(amount, id);
  return response.status(200).json({ data: statuses });
});

app.post("/bot", async (request, response) => {
  const message = request.body;
  const id = message?.id;
  const status = message?.status;
  const capacity = message?.capacity;
  const cph = message?.coins_per_hour;
  const tm = message?.total_made;

  if (!message) {
    return response
      .status(400)
      .json({ message: "You must include a message in your request." });
  }
  if (message.status === null || message.status === undefined) {
    return response
      .status(400)
      .json({
        error: true,
        message: "Did you mean to use /fuel api endpoint instead?",
      });
  }
  if (message.id === null || message.id === undefined)
    return response
      .status(400)
      .json({
        error: true,
        message: "You must include an id in your request.",
      });
  if (message.capacity === null || message.capacity === undefined)
    return response
      .status(400)
      .json({
        error: true,
        message: "You must include a capacity in your request.",
      });
  if (message.coins_per_hour === null || message.coins_per_hour === undefined)
    return response
      .status(400)
      .json({
        error: true,
        message: "You must include a coins_per_hour in your request.",
      });
  if (message.total_made === null || message.total_made === undefined)
    return response
      .status(400)
      .json({
        error: true,
        message: "You must include a total_made in your request.",
      });

  const updateDbResults = dbl.postBotStatistics(id, { status, capacity, cph, tm });
  return response.status(200).json({ data: updateDbResults });
});