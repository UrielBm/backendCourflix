const checkAdmin = (req, res, next) => {
  const { user } = req;
  if (user) {
    const { isAdmin } = user;
    if (isAdmin) {
      next();
    } else {
      res.status(403).json({
        response: "no tiene permiso de acceder",
      });
    }
  } else {
    res.status(401).json({
      response: "no se ha logueado",
    });
  }
};
module.exports = checkAdmin;
