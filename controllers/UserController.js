class UserController {
  constructor(userService, movieService) {
    this.userService = userService;
    this.movieService = movieService;
  }
  async getUsers(req, res) {
    const { pag } = req.query;
    let offset = 0;
    if (pag) {
      offset = 7 * (pag - 1);
    }
    try {
      const response = await this.userService.getUsers(offset);
      const usuarios = response.map(({ _id, name, favMovie, isAdmin }) => {
        return {
          id: _id,
          name: name,
          favMovie: favMovie,
          isAdmin: isAdmin,
        };
      });
      res.status(200).json(usuarios);
    } catch (e) {
      res.status(500).send(`no se pudo recuperar la data type ${e}`);
    }
  }
  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await this.userService.getUserById(id);
      if (user.favMovie && user.favMovie != "") {
        const favMovie = await this.movieService.getMovieByName(user.favMovie);
        const data = {
          id: user._id,
          name: user.name,
          favMovie: user.favMovie,
          isAdmin: user.isAdmin,
          movie: {
            id: favMovie._id,
            name: favMovie.name,
            category: favMovie.category,
            type: favMovie.type,
            image: favMovie.image,
            source: favMovie.source,
          },
        };
        res.status(200).json(data);
      } else {
        const data = {
          id: user._id,
          name: user.name,
          favMovie: user.favMovie,
          isAdmin: user.isAdmin,
        };
        res.status(200).json(data);
      }
    } catch (e) {
      res.status(500).send(`Server Error, user no found type: ${e}`);
    }
  }
  async postUser(req, res) {
    const { name, password } = req.body;
    const user = req.body;
    const email = user.email.toLowerCase();
    if (name && email && password) {
      try {
        await this.userService.insertUser({ ...user, email });
        res.status(200).send(`registro hecho correctamente`);
      } catch (e) {
        res.status(500).send(`Server error, type ${e}`);
      }
    } else {
      res.status(400).send(`faltan datos para poder hacer el registro`);
    }
  }
  async editAUser(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      await this.userService.updateUser(id, data);
      res.status(200).send(`update hecho correctamente en el id: ${id}`);
    } catch (e) {
      res.status(500).send(`Server Error, type ${e}`);
    }
  }
  async deleteAUser(req, res) {
    const { id } = req.params;
    try {
      await this.userService.deleteAUser(id);
      res.status(200).send(`SEelimino correctamente el usuario con id ${id}`);
    } catch (e) {
      res.status(500).send(`Server Error, type ${e}`);
    }
  }
  loginUser(req, res) {
    res.status(200).json({ response: "login exitoso welcome" });
  }
}
module.exports = UserController;
