const Movie = require("./../models/MovieModel");

class MovieService {
  getMovies(pag) {
    const query = Movie.find({ type: "movie" }).skip(pag).limit(7).exec();
    return query;
  }
  getSeries() {
    const query = Movie.find({ type: "serie" }).exec();
    return query;
  }
  getMovieByName(name) {
    const query = Movie.findOne({ name }).exec();
    return query;
  }
  getMovieById(id) {
    const query = Movie.findOne({ _id: id }).exec();
    return query;
  }
  insertMovie(movie) {
    const newMovie = new Movie(movie);
    return newMovie.save();
  }
  updateMovie(id, data) {
    const query = Movie.findOneAndUpdate({ _id: id }, data).exec();
    return query;
  }
  deleteMovie(id) {
    const query = Movie.deleteOne({ _id: id }).exec();
    return query;
  }
}
module.exports = MovieService;
