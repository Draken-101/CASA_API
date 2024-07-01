import express from "express";
import cors from 'cors'
import signale from "signale"
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors({
    "origin":"*"
}));

app.listen(PORT, () => {
    console.clear();
    // [36m]-Cyan | [35m]-Magenta | [1m]-Blanco | [\xqb]-AgreagaColor | [0m]-noBold | [1m]-Bold
    signale.success(`🚀 \x1b[1m\x1b[36m|\x1b[0m \x1b[35mServidor corriéndose en el puerto\x1b[0m \x1b[1m${PORT}\x1b[0m \x1b[1m\x1b[36m|\x1b[0m 🌐`);
});