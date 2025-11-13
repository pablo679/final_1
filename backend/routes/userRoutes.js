
import express from 'express';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

// @desc    Registrar un nuevo usuario
// @route   POST /api/users
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // El 'pre-save' hook en User.js se encargará de hashear el password
        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            generateToken(res, user._id); // Genera el token y lo guarda en la cookie
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            });
        } else {
            res.status(400).json({ message: 'Datos de usuario inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Autenticar (login) un usuario y obtener token
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Comparamos la contraseña ingresada con la hasheada en la BD
        // usando el método 'matchPassword' que creamos en el modelo
        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id); // Genera el token y lo guarda en la cookie
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            });
        } else {
            res.status(401).json({ message: 'Email o contraseña inválidos' }); // 401 = No autorizado
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Cerrar sesión (logout) y limpiar cookie
// @route   POST /api/users/logout
// @access  Public (o Privado, pero POST es simple)
router.post('/logout', (req, res) => {
    // La cookie se llama 'jwt' (como en generateToken.js)
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0) // Expira la cookie inmediatamente
    });
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
});

export default router;