export const adminRoute = (req, res) => {
  res.send("Bienvenido a la página de administración, " + req.user.name);
};
