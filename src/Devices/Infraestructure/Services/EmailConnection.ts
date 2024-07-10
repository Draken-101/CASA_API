
import EmailRepository from "../../Domain/Repositories/EmailJs";
import dotenv from 'dotenv';
dotenv.config();

const SERVICE_ID = process.env.EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID!;
const USER_ID = process.env.EMAILJS_USER_ID!;



export default class EmailConnection implements EmailRepository{

    async sendEmail(deviceName: string): Promise<void> {
        const url = 'https://api.emailjs.com/api/v1.0/email/send';
        const date = new Date();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const params = {
            to_name: 'leonardofavion@gmail.com',
            from_name: 'Aviso',
            message: 'Alguien ah usado ' + deviceName + ', no esta autenticado!\n Hora de accion: ' + hour  + ':' + minutes + ':',
            reply_to: ''
        }
        try {
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                service_id: SERVICE_ID,
                template_id: TEMPLATE_ID,
                user_id: USER_ID,
                template_params: params,
              }),
            });
        
            if (!response.ok) {
              throw new Error(`Error al enviar el correo: ${response.statusText}`);
            }
        
            const result = await response.json();
            console.log('Correo enviado correctamente', result);
          } catch (error) {
            console.error('Error al enviar el correo:', error);
          }
    }
}