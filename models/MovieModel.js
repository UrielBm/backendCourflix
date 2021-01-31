const mongoose = require("mongoose");

const MovieShema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "general",
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["movie", "serie"],
    default: "movie",
  },
  description: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Movie", MovieShema);
