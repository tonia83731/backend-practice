import express from "express";
import User from "../../models/user.js";
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", (req, res) => {});
router.get("/register", (req, res) => {
  res.render("register");
});
// register
router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  User.findOne({ email })
    .then((user) => {
      // 使用者已註冊
      if (user) {
        console.log("User already exists.");
        res.render("register", {
          name,
          email,
          password,
          confirmPassword,
        });
      } 
      // 使用者未註冊，創建資料
      else {
        return User.create({
          name,
          email,
          password,
        })
          .then(() => res.redirect("/"))
          .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
});

export default router;
