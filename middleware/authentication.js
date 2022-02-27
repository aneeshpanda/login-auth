const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/User");
const Blacklisted = require("../models/Blacklisted");
const { ExtractJwt } = passportJWT;

const { Strategy: JwtStrategy } = passportJWT;

passport.use(
  "userStrategy",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const token = await Blacklisted.findOne({
          jwtToken: jwt.sign(jwtPayload, process.env.TOKEN_SECRET),
        });
        if (!token) {
          const user = await User.findOne({
            where: { googleId: jwtPayload.googleId },
          });
          done(null, user);
        } else {
          done(null, false, { message: "Token is blacklisted" });
        }
      } catch (error) {
        console.error(error);
        done(null, false, {
          message: "Please login through a valid email address!",
        });
      }
    }
  )
);

