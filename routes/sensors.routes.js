import express from "express";
import {
    getAllSensors,
    createSensor,
    getSensorById,
    updateSensor,
    deleteSensor,
} from "../controllers/sensor.controller.js";

const router = express.Router();

router.get("/sensors", getAllSensors);
router.post("/sensors", createSensor);
router.get("/sensors/:id", getSensorById);
router.put("/sensors/:id", updateSensor);
router.delete("/sensors/:id", deleteSensor);

export default router;
