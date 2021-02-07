const Season = require("./../models/SeasonModel");

class SeasonService {
  getSeason(id) {
    const query = Season.find({ serie_id: id }).exec();
    return query;
  }
  insertSeason(season) {
    const newSeason = new Season(season);
    return newSeason.save();
  }
  updateSeason(id, data) {
    const query = Season.findOneAndUpdate({ _id: id }, data).exec();
    return query;
  }
  deleteSeason(id) {
    const query = Season.deleteOne({ _id: id }).exec();
    return query;
  }
}
module.exports = SeasonService;
