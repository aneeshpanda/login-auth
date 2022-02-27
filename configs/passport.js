const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await User.findOneAndUpdate(
        { googleId: profile._json.sub },
        { googleId: profile._json.sub, email: profile._json.email },
        { new: true, upsert: true }
      );
      if (user) {
        const token = jwt.sign(
          { googleId: user.googleId, time: new Date().getTime() },
          process.env.TOKEN_SECRET
        );
        return cb(null, { token, user });
      }
      return cb(null, false, { message: "Incorrect credentials" });
    }
  )
);
