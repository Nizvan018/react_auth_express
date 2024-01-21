import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { create_access_token } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

/** Método para registrar usuarios dentro de la base de datos */
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    const user_found = await User.findOne({ email });

    if (user_found) {
        return res.status(400).json({ message: 'El email ya está en uso' });
    }

    try { // Intenta guardar el usuario en la base de datos:
        const hashed_password = await bcrypt.hash(password, 10);

        const new_user = new User({
            username,
            email,
            password: hashed_password
        });

        const user_saved = await new_user.save();
        const token = await create_access_token({ id: user_saved._id });

        res.cookie('token', token);
        res.json({
            message: 'Usuario creado satisfactoriamente',
            data: {
                id: user_saved._id,
                username: user_saved.username,
                email: user_saved.email
            }
        });
    } catch (error) { // En caso de error al amacenar el usuario:
        res.status(500).json({ message: 'Error desconocido', data: error });
    }
}

/** Método para iniciar sesión con un usuario de la base de datos */
export const login = async (req, res) => {
    const { email, password } = req.body;

    try { // Intenta guardar el usuario en la base de datos:
        const user_found = await User.findOne({ email });

        if (!user_found) {
            return res.status(400).json({ message: 'No se encontró al usuario' });
        }

        const password_match = await bcrypt.compare(password, user_found.password);

        if (!password_match) {
            return res.status(400).json({ message: 'La contraseña es incorrecta' });
        }

        const token = await create_access_token({ id: user_found._id });

        res.cookie('token', token);
        res.json({
            message: 'Usuario logeado satisfactoriamente',
            data: {
                id: user_found._id,
                username: user_found.username,
                email: user_found.email
            }
        });
    } catch (error) { // En caso de error al amacenar el usuario:
        res.status(500).json({ message: 'Error desconocido', data: error });
    }
}

/** Método para cerrar la sesión del usuario actual */
export const logout = async (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    });

    return res.sendStatus(200);
}

/** Método para obtener la información del usuario logeado */
export const profile = async (req, res) => {
    const user_found = await User.findById(req.user.id);

    if (!user_found) {
        return res.status(400).json({ message: 'User not found' });
    }

    return res.json({
        id: user_found._id,
        username: user_found.username,
        email: user_found.email,
        createAt: user_found.createAt,
        updateAt: user_found.updateAt
    });
}

export const verify_token = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'Unathorized' });

        const user_found = await User.findById(user.id);

        if (!user_found) return res.status(401).json({ message: 'Unauthorized' });

        return res.json({
            id: user_found._id,
            username: user_found.username,
            email: user_found.email
        });
    });
}