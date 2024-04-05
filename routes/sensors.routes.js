import express from "express";
import {
    getAllSensors,
    createSensor,
    getSensorById,
    updateSensor,
    deleteSensor,
} from "../controllers/sensor.controller.js";

const router = express.Router();

router.get("/getall", getAllSensors);
router.post("/createSensor", createSensor);
router.get("/getSensor/:id", getSensorById);
router.put("/UpdateSensor/:id", updateSensor);
router.delete("/DeleteSensor/:id", deleteSensor);

export default router;
