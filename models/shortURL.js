const mongoose = require("mongoose");

const shortURLSchema = new mongoose.Schema({
  originalURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("ShortURL", shortURLSchema);
