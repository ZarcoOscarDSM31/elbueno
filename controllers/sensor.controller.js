import Sensor from '../models/sensor.model.js';

// Controlador para obtener todos los sensores
export const getAllSensors = async (req, res) => {
    try {
        const sensors = await Sensor.find();
        res.status(200).json(sensors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para crear un nuevo sensor
export const createSensor = async (req, res) => {
    const sensor = new Sensor(req.body);
    try {
        const newSensor = await sensor.save();
        res.status(201).json(newSensor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controlador para obtener un sensor por su ID
export const getSensorById = async (req, res) => {
    try {
        const sensor = await Sensor.findById(req.params.id);
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor not found' });
        }
        res.status(200).json(sensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para actualizar un sensor por su ID
export const updateSensor = async (req, res) => {
    try {
        const sensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor not found' });
        }
        res.status(200).json(sensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para eliminar un sensor por su ID
export const deleteSensor = async (req, res) => {
    try {
        const sensor = await Sensor.findByIdAndDelete(req.params.id);
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor not found' });
        }
        res.status(200).json({ message: 'Sensor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
