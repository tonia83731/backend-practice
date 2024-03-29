import mongoose from "mongoose";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", (err) => {
  console.error("mongodb error!", err);
});
db.once("open", () => {
  console.log("mongodb connected!");
});

export default db