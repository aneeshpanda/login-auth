const mongoose = require("mongoose");
const DB_URL = process.env.DB_URI;  

module.exports = () => {
  try {
    mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log("Could not connect");
  }

  return mongoose.connection;
};
