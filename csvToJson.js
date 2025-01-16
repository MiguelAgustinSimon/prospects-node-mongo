import fs from 'fs';
import csv from 'csvtojson';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1);
});

// Definir el esquema y modelo de Prospect
const prospectSchema = new mongoose.Schema({
    name: String,
    email: String,
    country: String,
    jobTitle: String,
    yearsOfExperience: Number,
    industry: String,
    companySize: String,
    score: Number,
});

const Prospect = mongoose.model('Prospect', prospectSchema);

const csvFilePath = './prospects.csv';

const importData = async () => {
    try {
        // Convertir el archivo CSV a JSON
        const prospects = await csv().fromFile(csvFilePath);

        const prospectsWithScore = prospects.map((prospect) => ({
            ...prospect,
            score: prospect.yearsOfExperience * 10 || 0,
        }));

        // Insertar datos en la colección
        await Prospect.insertMany(prospectsWithScore);
        console.log('Datos importados exitosamente a MongoDB');
    } catch (err) {
        console.error('Error al importar datos:', err);
    } finally {
        mongoose.disconnect(); // Cerrar la conexión
    }
};

importData();