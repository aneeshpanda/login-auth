const express = require("express");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const port = process.env.PORT || 5000;

const app = express();

const connectToMongo = require("./models/db");
const authRoute = require("./routes/authentication");
const logoutRoute = require("./routes/logout");
const authenticatedRoute = require("./routes/authenticated");
require("./middleware/authentication");

app.use(
  express.json({
    extended: false,
  })
);
app.use(cors());
app.use(passport.initialize());

connectToMongo().on("connected", () => {
  console.log("✅ Mongoose is connected");
});

const userAuthMiddleware = (req, res, next) => {
  passport.authenticate(
    "userStrategy",
    {
      session: false,
    },
    (err, user, info) => {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong",
        });
      }
      if (!user) {
        return res.status(401).json({
          message: info.message,
        });
      }
      next();
    }
  )(req, res, next);
};

app.use("/api/auth", authRoute);
app.use("/api/auth", userAuthMiddleware, logoutRoute);
app.use("/api", userAuthMiddleware, authenticatedRoute);

app.get("/", (req, res) => {
  res.json({ success: true, status: "Runnning" });
});

app.listen(port, () => {
  console.log("🚀 Server Ready! at port:", port);
});
