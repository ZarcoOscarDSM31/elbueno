import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// Lista de tokens válidos
let validTokens = [];

// Crea un token de acceso
export const createAccessToken = (userId, rol) => {
    const token = jwt.sign({ userId, rol }, TOKEN_SECRET, { expiresIn: "1h" });
    validTokens.push(token);
    return token;
};

// Elimina un token de la lista de tokens válidos
export const removeAccessToken = (token) => {
    validTokens = validTokens.filter((t) => t !== token);
};
