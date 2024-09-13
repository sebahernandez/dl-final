import { Router } from "express";
const router = Router();

router.all("*", (req, res) => {
  res.status(404).json({
    status: false,
    message: "No se encontró la ruta, error por defecto",
  });
});

export default router;
