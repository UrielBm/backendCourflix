class MovieController {
  constructor(movieServices) {
    this.movieServices = movieServices;
  }
  async getMovies(req, res) {
    const { pag } = req.query;
    let offset = 0;
    if (pag) {
      offset = 7 * (pag - 1);
    }
    try {
      const response = await this.movieServices.getMovies(offset);
      const movies = response.map(
        ({ _id, name, image, category, type, source }) => {
          return {
            id: _id,
            name: name,
            category: category,
            type: type,
            image: image,
            source: source,
          };
        }
      );
      res.status(200).json(movies);
    } catch (e) {
      res.status(500).send(`Server Error, type : ${e}`);
    }
  }
  async getMovieById(req, res) {
    try {
      const { id } = req.params;
      const response = await this.movieServices.getMovieById(id);
      const { _id, name, category, type, image, source } = response;
      const movie = {
        id: _id,
        name: name,
        category: category,
        type: type,
        image: image,
        source: source,
      };
      res.status(200).json(movie);
    } catch (e) {
      res.status(500).send(`Server Error, type ${e}`);
    }
  }
  async postAMovie(req, res) {
    const { body } = req;
    const image = req.file.filename;
    console.log(req.file);
    const name = body.name.toLowerCase();
    const movie = req.body;
    if (body.name && image) {
      try {
        await this.movieServices.insertMovie({ ...movie, name, image });
        res.status(200).send(`registro correctamente`);
      } catch (e) {
        res.status(500).send(`Server error type ${e}`);
      }
    } else {
      res
        .status(400)
        .send(`faltan parametros necesarios pueden ser bame o image`);
    }
  }
  async editAMovie(req, res) {
    const { id } = req.params;
    const { body } = req;
    const name = body.name.toLowerCase();
    if (body) {
      try {
        await this.movieServices.updateMovie(id, { ...body, name });
        res.status(200).send(`update en el registro con id ${id} exitoso`);
      } catch (e) {
        res.status(500).send(`Server Error, type ${e}`);
      }
    } else {
      res.status(400).send(`fatan parametros a modificar`);
    }
  }
  async deleteAMovie(req, res) {
    const { id } = req.params;
    try {
      await this.movieServices.deleteAMovie(id);
      res.status(200).send(`Se elimino la pelicula con id ${id} correctamente`);
    } catch (e) {
      res.status(500).send(`Server Error type ${e}`);
    }
  }
}

module.exports = MovieController;
