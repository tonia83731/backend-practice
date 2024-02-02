import passport from "passport";
import FacebookStrategy from "passport-facebook"
import bcrypt from "bcryptjs"
import local from 'passport-local';
import User from "../models/user.js";
const LocalStrategy = local.Strategy

export default (app) => {
  // 初始化passport模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if(!user) return done(null, false, {message: 'That email is not registered!'})
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(!isMatch) return done(null, false, {
              message: "Email or Password incorrect.",
            });
            return done(null, user)
          })
      })
      .catch(error => done(error, false))
  }))
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ["email", "displayName"],
      },
      (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json;
        User.findOne({ email }).then((user) => {
          if (user) return done(null, user);
          const randomePassword = Math.random().toString(36).slice(-8);
          bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(randomePassword, salt))
            .then((hash) =>
              User.create({
                name,
                email,
                password: hash,
              })
            )
            .then((user) => done(null, user))
            .catch((error) => done(error, false));
        });
      }
    )
  );
  // 設定序列化和反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, null))
  })
}