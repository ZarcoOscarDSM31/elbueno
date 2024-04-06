import Sensor from '../models/sensor.model.js';
import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';

const url = 'mongodb://localhost:27017/';
const dbName = 'Aplicaction';
const collectionName = 'sensores';
const sensorIP = 'http://192.168.100.41/datos';

async function fetchDataFromSensor() {
    try {
        const response = await fetch(sensorIP);
        const sensorData = await response.json();
        return sensorData;
    } catch (error) {
        console.error('Error al obtener datos del sensor:', error);
        return null;
    }
}

async function insertDataIntoMongoDB(data) {
    const client = new MongoClient(url);

    try {
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Agregar el timestamp actual al objeto de datos
        const timestampedData = {
            ...data,
            timestamp: new Date() // Agrega el timestamp actual
        };

        const result = await collection.insertOne(timestampedData);
        console.log(`Se insertaron ${result.insertedCount} documentos en MongoDB`);

    } catch (error) {
        console.error('Error al insertar datos en MongoDB:', error);
    } finally {
        await client.close();
    }
}


async function main() {
    const sensorData = await fetchDataFromSensor();
    if (sensorData) {
        await insertDataIntoMongoDB(sensorData);
    }
}

// Llamar a la función main() inicialmente
main();

// Programar la ejecución de la función main() cada 15 minutos
setInterval(main, 900000); // 15 minutos * 60 segundos/minuto * 1000 milisegun

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
        res.status(201).json({ message: 'Sensor creado correctamente', sensor: newSensor });
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
        res.status(200).json({ message: 'Sensor actualizado correctamente', sensor });
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
