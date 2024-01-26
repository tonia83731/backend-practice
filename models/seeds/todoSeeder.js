// import mongoose from "mongoose";
// import dotenv from "dotenv";

import Todo from "../todo.js";
import db from "../../config/mongoose.js";

// if (process.env.NODE_ENV !== "production") {
//   dotenv.config();
// }

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", (err) => {
//   console.error("mongodb error!", err);
// });
db.once("open", () => {
  console.log("mongodb connected!");
  for (let i = 0; i < 10; i++) {
    Todo.create({
      name: `My todo name-${i}`,
      type: "work",
      description: `This is todolist item No.${i}`,
    });
  }
  console.log('done')
});
