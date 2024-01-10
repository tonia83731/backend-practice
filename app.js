import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => {
  console.error("mongodb error!", err);
});
db.once("open", () => {
  console.log("mongodb connected!");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
