const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../configs/passport");

const router = new Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}authFailure`,
    session: false,
  }),
  (req, res) => {
    res.redirect(
      `${process.env.FRONTEND_URL}authSuccess?token=${req.user.token}`
    );
  }
);

module.exports = router;
