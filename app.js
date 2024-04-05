// app.js
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { MONGODB_URI } from "./config.js"; // Importa MONGODB_URI desde config.js

const app = express();

// Middleware para parsear JSON en el body
app.use(express.json());

// Middleware para cookies
app.use(cookieParser());

// Conexión a la base de datos
mongoose.connect(MONGODB_URI, { // Utiliza MONGODB_URI aquí
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Rutas de la API
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Puerto del servidor
const port = process.env.PORT || 3000;

export default app;
