const { Router } = require("express");
const Blacklisted = require("../models/Blacklisted");

const router = new Router();

router.get("/google/logout", async (req, res) => {
  await Blacklisted.create({
    jwtToken: req.headers.authorization.split(" ")[1],
  });
  res.json({ success: true, message: "Logged out" });
});

module.exports = router;
