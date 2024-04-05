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

// Rutas de la API
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import sensorRoutes from "./routes/sensors.routes.js"; // Importa las rutas de los sensores

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sensor", sensorRoutes); // Agrega las rutas de los sensores bajo /api


export default app;
