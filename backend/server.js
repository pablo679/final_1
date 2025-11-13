
// 1. Cambiamos 'require' por 'import'
import dotenv from 'dotenv';

dotenv.config();// 2. Configuramos dotenv

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// importamos rutas
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'; // 3. Importamos las nuevas rutas de usuario
import orderRoutes from './routes/orderRoutes.js';


const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

// --- MIDDLEWARES ---
const whitelist = [
    'http://localhost:5173', // frontend de desarrollo
    'https://ecommerce-hermanos-jota-mern.vercel.app' // frontend de Vercel
];

const corsOptions = {
    origin: function (origin, callback) {
        // Permitir peticiones si están en la whitelist o si no tienen origen (ej: Postman)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions)); // Usa las opciones avanzadas

app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.url}`);
    next();
});
app.use(express.json());

// --- RUTAS ---
app.use('/api/productos', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// --- MANEJO DE ERRORES ---
app.use((req, res, next) => {
    res.status(404).json({ message: 'La ruta solicitada no existe.' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor.' });
});

// --- CONEXIÓN A MONGODB Y ARRANQUE DEL SERVIDOR ---
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Conectado a MongoDB Atlas');
        
        // Solo arrancamos el servidor si la BD se conecta
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB:', err);
        process.exit(1); // Detiene la aplicación si no se puede conectar a la BD
    });