const SeasonService = require("../services/SeasonServices");

class SeasonController {
  constructor(seasonServices) {
    this.seasonServices = seasonServices;
  }
  async getSeason(req, res) {
    try {
      const response = await this.seasonServices.getSeason();
      const seasons = response.map(({ _id, serie_id, name, episodes }) => {
        return {
          id: _id,
          serie_id: serie_id,
          name: name,
          episodes: episodes,
        };
      });
      res.status(200).json(seasons);
    } catch (e) {
      res.status(500).send(`Server Error,type: ${e}`);
    }
  }
  async postSeason(req, res) {
    const { body } = req;
    const name = body.name.toLowerCase();
    const season = req.body;
    if (body.serie_id && body.name && body.episodes) {
      try {
        await this.seasonServices.insertSeason({ ...season, name });
        res.status(200).send(`registro de season correctamente`);
      } catch (e) {
        res.status(500).send(`Server error type ${e}`);
      }
    } else {
      res
        .status(400)
        .send(
          `faltan paramentros pueden ser el nombre de la serie el nombre de la season o el array de episodios`
        );
    }
  }
  async editSeason(req, res) {
    const { id } = req.params;
    const { body } = req;
    if (body) {
      try {
        await this.seasonServices.updateSeason(id, body);
        res.status(200).send(`update en el registro con id ${id} exitoso`);
      } catch (e) {
        res.status(500).send(`Server Error,type ${e}`);
      }
    } else {
      res.status(400).send(`faltan parametros a modificar`);
    }
  }
  async deleteSeason(req, res) {
    const { id } = req.params;
    try {
      await this.seasonServices.deleteSeason(id);
      res.status(200).send(`Se elimino la pelicula con id ${id} correctamente`);
    } catch (e) {
      res.status(500).send(`Server Error type ${e}`);
    }
  }
}
module.exports = SeasonController;
