const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("./../controllers/UserController");
const MovieController = require("./../controllers/MovieController");
const UserService = require("./../services/UserService");
const MovieService = require("./../services/MovieService");
const checkAdmin = require("./../utils/checkAdmin");
const checkAutenticado = require("./../utils/checkAutenticado");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

const pictureMovie = multer({ storage: storage });

const IntanceUser = new UserController(new UserService(), new MovieService());
const IntanceMovie = new MovieController(new MovieService());
// routes of users
router.delete("/user/delete/:id", checkAdmin, (req, res, next) => {
  IntanceUser.deleteAUser(req, res);
});
router.put("/user/edit/:id", checkAdmin, (req, res, next) => {
  IntanceUser.editAUser(req, res);
});
router.post("/registeruser", (req, res, next) => {
  IntanceUser.postUser(req, res);
});
router.get("/user/:id", (req, res, next) => {
  IntanceUser.getUserById(req, res);
});
router.get("/users", (req, res, next) => {
  IntanceUser.getUsers(req, res);
});
// routes of movies
router.delete("/movie/delete/:id", checkAdmin, (req, res, next) => {
  IntanceMovie.deleteAMovie(req, res);
});
router.put("/movie/edit/:id", checkAdmin, (req, res, next) => {
  IntanceMovie.editAMovie(req, res);
});
router.post(
  "/registermovie",
  checkAdmin,
  pictureMovie.single("portada"),
  (req, res, next) => {
    IntanceMovie.postAMovie(req, res);
  }
);
router.get("/movie/:id", (req, res, next) => {
  IntanceMovie.getMovieById(req, res);
});
router.get("/movies", (req, res, next) => {
  IntanceMovie.getMovies(req, res);
});
router.post("/login", passport.authenticate("local"), (req, res) => {
  IntanceUser.loginUser(req, res);
});
router.get("/", function (req, res, next) {
  res.send("welcome to an Api of Courflix");
});

module.exports = router;
