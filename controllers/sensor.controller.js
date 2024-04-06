import Sensor from '../models/sensor.model.js';

export const getAllSensors = async (req, res) => {
    try {
        const sensors = await Sensor.find();
        res.status(200).json(sensors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSensor = async (req, res) => {
    const sensor = new Sensor(req.body);
    try {
        const newSensor = await sensor.save();
        res.status(201).json({ message: 'Sensor creado correctamente', sensor: newSensor});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getSensorById = async (req, res) => {
    try {
        const sensor = await Sensor.findById(req.params.id);
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor no encontrado' });
        }
        res.status(200).json(sensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSensor = async (req, res) => {
    try {
        const sensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor no encontrado' });
        }
        res.status(200).json({ message: 'Sensor actualizado correctamente', sensor});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSensor = async (req, res) => {
    try {
        const sensor = await Sensor.findByIdAndDelete(req.params.id);
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor no encontrado' });
        }
        res.status(200).json({ message: 'Sensor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
