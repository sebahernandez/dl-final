import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ name, recipientEmail, message }) => {
  try {
    // Cuerpo HTML del mensaje
    const emailBody = `
      <h1>Nuevo Mensaje de Contacto</h1>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${recipientEmail}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
    `;

    // Enviar el correo
    const response = await resend.emails.send({
      from: "Sitio web sneakers <onboarding@resend.dev>", // Cambia el remitente si lo deseas
      to: [recipientEmail], // Se envía el correo al destinatario proporcionado
      subject: "Correo de contacto",
      html: emailBody, // Cuerpo del correo
    });

    console.log("Correo enviado con éxito:", response);
    return response;
  } catch (error) {
    console.error("Error enviando correo:", error);
    throw error;
  }
};
