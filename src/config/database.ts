import mongoose from 'mongoose';
import signale from 'signale';
import * as dotenv from 'dotenv'
import UserModel from './Models/UserModel';

dotenv.config();

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/Casa';

const ConectionToMongoDB = async () => {
    try {
        const conn = await mongoose.connect(DB_URI, {});

        signale.success(`🌐 \x1b[1m\x1b[36m|\x1b[0m\x1b[35m Conectado a MongoDB: \x1b[1m\x1b[37m${conn.connection.host}\x1b[0m \x1b[1m\x1b[36m|\x1b[0m ✅`)
    } catch (error) {
        signale.error(error);
    }
}

export default ConectionToMongoDB;