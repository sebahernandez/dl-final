import { Router } from "express";
import { sendEmail } from "../../utils/emailService.js";

const router = Router();

router.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const response = await sendEmail({
      name,
      recipientEmail: email,
      message,
    });
    res.status(200).json({ message: "Correo enviado correctamente", response });
  } catch (error) {
    res.status(500).json({ error: "Error enviando el correo" });
  }
});

export default router;
