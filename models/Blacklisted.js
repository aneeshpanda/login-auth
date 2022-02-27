const mongoose = require("mongoose");

const blacklistedSchema = new mongoose.Schema({
  jwtToken: {
    type: String,
    required: true,
    immutable: true,
  },
});

const blacklistedModel = mongoose.model("Blacklisted", blacklistedSchema);

module.exports = blacklistedModel;
