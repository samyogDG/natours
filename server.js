const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");

const DB = process.env.MONGO_URI;
mongoose.connect(DB).then(() => {
  console.log(`connected to db`);
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`app is running at ${port} `);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
