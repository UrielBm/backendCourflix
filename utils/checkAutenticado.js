const checkAutenticado = (req, res, next) => {
  const { user } = req;

  if (user) {
    next();
  } else {
    res.status(401).send(`no se ha logueado previamente`);
  }
};

module.exports = checkAutenticado;
