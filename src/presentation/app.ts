import express from "express";
import cors from 'cors'
import ConectionToMongoDB from '../config/database'
import { UserRoutes } from "../User/Infraestructure/Routes/User.routes";
import { custom, customText } from "../config/Services/customSignale";
import DeviceRouter from "../Devices/Infraestructure/Routes/Device.routes";

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
    console.clear();
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