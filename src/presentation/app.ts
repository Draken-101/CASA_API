import express from "express";
import cors from 'cors'
import ConectionToMongoDB from '../config/database'
import { UserRoutes } from "../User/Infraestructure/Routes/User.routes";
import { custom, customText } from "../config/Services/customSignale";
import DeviceRouter from "../Devices/Infraestructure/Routes/Device.routes";
import { webSocketService } from "../Devices/Infraestructure/Dependencies";
import * as dotenv from 'dotenv';

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

ConectionToMongoDB();



app.listen(PORT, () => {
    // [36m]-Cyan | [35m]-Magenta | [37m]-Blanco | [\xqb]-AgreagaColor | [0m]-noBold | [1m]-Bold
    
    
    console.log(WS_URI);
    custom.Success(
        '🚀' + 
        customText.bold + customText.colors.cyan + ' | ' + customText.end +
        customText.colors.magenta + 'Servidor corriendo en el puerto:' + customText.end,
        customText.bold + customText.colors.blanco + `${PORT}` + customText.end,
        customText.bold + customText.colors.cyan + '| ' + customText.end +
        '🚀'
    );
    
}); 

webSocketService.onMessage();

webSocketService.sendAction({nameUser: 'API_CASA', role: 'API', type: 'CONNECTION', message: 'CONNECTION', status:true});

console.clear();