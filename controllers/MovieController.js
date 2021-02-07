class MovieController {
  constructor(movieServices, seasonServices) {
    this.movieServices = movieServices;
    this.seasonServices = seasonServices;
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
        ({ _id, name, image, category, type, description, source }) => {
          return {
            id: _id,
            name: name,
            category: category,
            type: type,
            desc: description,
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
  async getSeries(req, res) {
    try {
      const response = await this.movieServices.getSeries();
      const series = response.map(
        ({ _id, name, image, category, type, description, source }) => {
          return {
            id: _id,
            name: name,
            category: category,
            type: type,
            desc: description,
            image: image,
            source: source,
          };
        }
      );
      res.status(200).json(series);
    } catch (e) {
      res.status(500).send(`Server Error, type : ${e}`);
    }
  }
  async getMovieById(req, res) {
    try {
      const { id } = req.params;
      const response = await this.movieServices.getMovieById(id);
      if (response.type == "movie") {
        const {
          _id,
          name,
          category,
          type,
          description,
          image,
          source,
        } = response;
        const movie = {
          id: _id,
          name: name,
          category: category,
          type: type,
          desc: description,
          image: image,
          source: source,
        };
        res.status(200).json(movie);
      } else {
        const seasonResponse = await this.seasonServices.getSeason(
          response._id
        );
        const serie = {
          id: response._id,
          name: response.name,
          category: response.category,
          type: response.type,
          desc: response.description,
          image: response.image,
          seasons: seasonResponse,
        };
        res.status(200).json(serie);
      }
    } catch (e) {
      res.status(500).send(`Server Error, type ${e}`);
    }
  }
  async postAMovie(req, res) {
    const { body } = req;
    const image = req.file.filename;
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
