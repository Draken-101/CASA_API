import express from "express";
import cors from 'cors'
import ConectionToMongoDB from '../config/database'
import { UserRoutes } from "../User/Infraestructure/Routes/User.routes";
import { custom, customText } from "../config/Services/customSignale";
import DeviceRouter from "../Devices/Infraestructure/Routes/Device.routes";
import { MQTT, webSocketService } from "../Devices/Infraestructure/Dependencies";
import * as dotenv from 'dotenv';
import ActionRoutes from "../Action/Infraestructure/routes/Action.routes";

dotenv.config()

const WS_URI = process.env.WS_URI || 'wss://localhost:8000';

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(cors({
    "origin":"*"
}));


app.use('/api/v1/users', UserRoutes);
 

app.use('/api/v1/devices', DeviceRouter);

app.use('/api/v1/Actions', ActionRoutes);

ConectionToMongoDB();

app.listen(PORT, () => {
    // [36m]-Cyan | [35m]-Magenta | [37m]-Blanco | [\xqb]-AgreagaColor | [0m]-noBold | [1m]-Bold
    
    custom.Success(
        '🚀' +    
        customText.bold + customText.colors.cyan + ' | ' + customText.end +
        customText.colors.magenta + 'Servidor corriendo en el puerto:' + customText.end,
        customText.bold + customText.colors.blanco + `${PORT}` + customText.end,
        customText.bold + customText.colors.cyan + '| ' + customText.end +
        '🚀'  
    ); 
    
}); 

MQTT.onMessage();

webSocketService.conection({nameUser: 'API_CASA', role: 'API', type: 'CONNECTION', message: 'CONNECTION', status:true});

console.clear();