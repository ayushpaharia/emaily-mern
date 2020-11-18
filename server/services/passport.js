if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: "./config/dev.env" });
else require("dotenv").config({ path: "./config/prod.env" });

const passport = require("passport");
const passportOAuth = require("passport-google-oauth20");
const { User } = require("../models/User.js");
const GoogleStrategy = passportOAuth.Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (!existingUser) {
            new User({ googleId: profile.id })
              .save()
              .then((user) => done(null, user));
            return;
          }
          done(null, existingUser);
        })
        .catch((err) => console.log(err));
    }
  )
);
