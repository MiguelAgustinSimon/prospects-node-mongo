import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Importa cors
import prospectsRouter from './routes/prospects.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Config CORS
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions)); // Usar cors como middleware

app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión:', err));


app.use('/prospects', prospectsRouter);


app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));