// libs/jwt.js
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const createAccessToken = (userId, rol) => {
    return jwt.sign({ userId, rol }, TOKEN_SECRET, { expiresIn: "1h" });
};
