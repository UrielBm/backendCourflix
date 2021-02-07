const mongoose = require("mongoose");

const SeasonShema = mongoose.Schema({
  serie_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: "season1",
  },
  episodes: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Season", SeasonShema);
