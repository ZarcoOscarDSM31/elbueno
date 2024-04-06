import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const auth = (req, res, next) => {
    try {
        const token = req.headers["authorization"]; 

        if (!token) {
            return res
                .status(401)
                .json({ message: "No se proporcionó un token de acceso" });
        }

        try {
            const decoded = jwt.verify(token.split(" ")[1], TOKEN_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token de acceso inválido" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const verifyAdmin = (req, res, next) => {
    if (req.user.rol !== "admin") {
        return res.status(403).json({ message: "Acceso denegado. Se requiere rol de administrador" });
    }
    next();
};
