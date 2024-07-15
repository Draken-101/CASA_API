
import EmailRepository from "../../Domain/Ports/SenderEmail";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'
dotenv.config();

const GMAIL_USER = process.env.GMAIL_USER!;
const GMAIL_PASS = process.env.GMAIL_PASS!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;



export default class EmailConnection implements EmailRepository {

  async sendEmail(deviceName: string): Promise<void> {
    try {
      if (!ADMIN_EMAIL) {
        throw new Error('Variables del usuario erroneos');
      }
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_PASS
        }
      });

      const mailOptions = {
        from: GMAIL_USER,
        to: ADMIN_EMAIL,
        subject: 'Aviso Casa',
        html: `
        <div style="background-color: rgb(3, 21, 53); padding: 1vw;">
            <h1 style="color: red; font-weight: bold;">Se ha detectado una actividad sospechosa:</h1>
            <p style="color: rgb(255, 255, 255); font-size: .5vw;"><b>Dispositivo:</b>    ${deviceName}</p>
            <p style="color: rgb(255, 255, 255); font-size: .5vw;"><b>Año:</b>    ${new Date().getFullYear().toLocaleString()}</p>
            <p style="color: rgb(255, 255, 255); font-size: .5vw;"><b>Mes:</b>    ${new Date().getMonth() + 1}</p>
            <p style="color: rgb(255, 255, 255); font-size: .5vw;"><b>Dia:</b>    ${new Date().getDate()}</p>
            <p style="color: rgb(255, 255, 255); font-size: .5vw;"><b>Hora:</b>    ${new Date().getHours().toLocaleString()}</p>
            <p style="color: rgb(255, 255, 255); font-size: .5vw;"><b>Minuto:</b>    ${new Date().getMinutes().toLocaleString()}</p>
        </div>
        `,
        // text: `Se ha detectado una actividad sospechosa: 
        //   Dispositivo: ${deviceName}
        //   Timestamp: ${new Date().toLocaleString()}`
      };

      await transporter.sendMail(mailOptions);
      console.log('Correo enviado al administrador por actividad sospechosa.');
    } catch (error) {
      console.error('Error:', error);
    }
  }
}