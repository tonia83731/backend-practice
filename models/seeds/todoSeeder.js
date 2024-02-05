import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Todo from "../todo.js";
import User from "../user.js";
import db from "../../config/mongoose.js";

if (process.env.NODE_ENV !== "production") {
  // console.log("here");
  dotenv.config();
}

const SEED_USER = {
  name: "root",
  email: "root@example.com",
  password: "12345678",
};

db.once("open", () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    )
    .then((user) => {
      const userId = user._id;
      for (let i = 0; i < 10; i++) {
        return Promise.all(
          Array.from({ length: 10 }, (_, i) =>
            Todo.create({
              name: `My todo name-${i}`,
              type: "work",
              description: "This is todo description",
              userId,
            })
          )
        );
      }
    })
    .then(() => {
      console.log("done.");
      process.exit();
    });
});
