import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(cookieParser());

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import sensorRoutes from "./routes/sensors.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sensor", sensorRoutes);


export default app;
