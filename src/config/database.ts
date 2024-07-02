import mongoose from 'mongoose';
import signale from 'signale';
import * as dotenv from 'dotenv'
import UserModel from './Models/UserModel';

dotenv.config();

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/Casa';

const ConectionToMongoDB = async () => {
    try {
        const conn = await mongoose.connect(DB_URI, {});

        const admin: any = await UserModel.find({ name: 'admin' });
        if (!admin || admin.length === 0) { 
            const addAdmin = new UserModel({
                name: "admin", 
                email: "admin@example.com", 
                password: "adminpassword",
                rol: 'admin' 
            });
            await addAdmin.save();
            signale.success('✅ \x1b[1m\x1b[36m|\x1b[0m \x1b[35m¡Administrador agregado!\x1b[0m \x1b[1m\x1b[36m|\x1b[0m');
        }
        signale.success(`🌐 \x1b[1m\x1b[36m|\x1b[0m\x1b[35m Conectado a MongoDB: \x1b[1m\x1b[37m${conn.connection.host}\x1b[0m \x1b[1m\x1b[36m|\x1b[0m ✅`)
    } catch (error) {
        signale.error(error);
    }
}

export default ConectionToMongoDB;