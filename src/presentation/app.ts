import express from "express";
import cors from 'cors'
import signale from "signale"
import ConectionToMongoDB from '../config/database'
import { UserRoutes } from "../User/Infraestructure/Routes/User.routes";

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(cors({
    "origin":"*"
}));

app.use('/users', UserRoutes);

ConectionToMongoDB();

app.listen(PORT, () => {
    console.clear();
    // [36m]-Cyan | [35m]-Magenta | [1m]-Blanco | [\xqb]-AgreagaColor | [0m]-noBold | [1m]-Bold
    signale.success(`🚀 \x1b[1m\x1b[36m|\x1b[0m \x1b[35mServidor corriéndose en el puerto\x1b[0m \x1b[1m\x1b[37m${PORT}\x1b[0m \x1b[1m\x1b[36m|\x1b[0m 🌐`);
});