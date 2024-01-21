import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

/** Método que protege las rutas (valida que exita un usuario para acceder a la ruta) */
export const auth_require = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;

        next();
    });
}