import mongoose from 'mongoose';
import signale from 'signale';
import * as dotenv from 'dotenv';
import { custom, customText } from './Services/customSignale';
import InicializateDB from './Services/InicializateDB';

dotenv.config();

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/Casa';

const ConectionToMongoDB = async () => {
    try {
        const conn = await mongoose.connect(DB_URI, {dbName:'Casa'});
         
        InicializateDB(); 
   
        custom.Success( 
            '🌐' +
            customText.bold + customText.colors.cyan + ' | ' + customText.end +
            customText.colors.magenta + 'Conectado a MongoDB: ' + customText.end +
            customText.bold + customText.colors.blanco + conn.connection.host + customText.end +
            customText.bold + customText.colors.cyan + ' | ' + customText.end +
            '🌐' 
        )
    } catch (error) {
        signale.error(error); 
    }
}

export default ConectionToMongoDB;  