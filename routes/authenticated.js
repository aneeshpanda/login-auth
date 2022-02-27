const { Router } = require("express");

const router = new Router();

router.get("/authenticated", async (req, res) => {
  res.json({
    success: true,
    status: "Authenticated",
  });
});

module.exports = router;
