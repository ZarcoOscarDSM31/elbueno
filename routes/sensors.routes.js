import express from "express";
import {
    getAllSensors,
    createSensor,
    getSensorById,
    updateSensor,
    deleteSensor,
} from "../controllers/sensor.controller.js";
import { auth, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/getall", getAllSensors);
router.post("/createSensor", auth, verifyAdmin, createSensor);
router.get("/getSensor/:id", auth, verifyAdmin, getSensorById);
router.put("/updateSensor/:id", auth, verifyAdmin, updateSensor);
router.delete("/deleteSensor/:id", auth, verifyAdmin, deleteSensor);

export default router;
