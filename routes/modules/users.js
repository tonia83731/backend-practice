import express from "express";
import User from "../../models/user.js";
import passport from "passport";
import bcrypt from 'bcryptjs'

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate(
    "local",
    {
      successRedirect: "/",
      failureRedirect: "/users/login",
      failureMessage: true,
    }
  )
);
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.flash("success_msg", "你已經成功登出。");
    res.redirect("/users/login");
  });
});
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
        return bcrypt
          .genSalt(10) // 產生salt, 設定複雜係數為10
          .then((salt) => bcrypt.hash(password, salt)) // 使用者密碼加鹽, 產生雜湊值
          .then((hash) =>
            User.create({
              name,
              email,
              password: hash, // 用雜湊值取代原本使用者密碼
            })
          )
          .then(() => res.redirect("/"))
          .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
});

export default router;
