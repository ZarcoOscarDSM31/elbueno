// controllers/auth.controller.js
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import { removeAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
    try {
        const { username, email, password, rol } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "El correo ya existe" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword, rol });
        await newUser.save();

        const token = createAccessToken(newUser._id, newUser.rol);

        let message;
        if (rol === "user") {
            message = "Hola usuario";
        } else if (rol === "admin") {
            message = "Hola administrador";
        } else {
            message = "Usuario registrado";
        }

        res.status(201).json({ message, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "El correo no existe" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }

        const token = createAccessToken(user._id, user.rol);

        let message;
        if (user.rol === "user") {
            message = "Hola usuario";
        } else if (user.rol === "admin") {
            message = "Hola administrador";
        } else {
            message = "Bienvenido";
        }

        res.status(200).json({ message, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
};

export const logout = async (req, res) => {
    try {
        // Eliminar el token de acceso del usuario
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).json({ message: "No se proporcionó un token de acceso" });
        }

        removeAccessToken(token); // Implementa esta función en tu archivo libs/jwt.js para eliminar el token

        res.status(200).json({ message: "Cerrar sesión exitoso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al cerrar sesión" });
    }
};