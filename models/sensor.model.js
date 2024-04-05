import mongoose from 'mongoose'; 

const sensorSchema = new mongoose.Schema(
    {
        humedad:{
            type: Number,
            required: [true, 'La humedad es obligatoria'],
            min: [0, 'La humedad no puede ser menor que 0'],
            max: [100, 'La humedad no puede ser mayor que 100'],
        },
        temperatura:{
            type: Number,
            required: [true, 'La temperatura es obligatoria'],
            min: [-273.15, 'La temperatura no puede ser menor que -273.15°C'], // Cero absoluto
        },
        nivelAgua:{
            type: Number,
            required: [true, 'El nivel de agua es obligatorio'],
            min: [0, 'El nivel de agua no puede ser menor que 0'],
            max: [100, 'El nivel de agua no puede ser mayor que 100'],
        },
        intensidadLuz: {
            type: Number,
            required: [true, 'La intensidad de luz es obligatoria'],
            min: [0, 'La intensidad de luz no puede ser menor que 0'],
        },
        valorGas: {
            type: Number,
            required: [true, 'El valor del gas es obligatorio'],
            min: [0, 'El valor del gas no puede ser menor que 0'],
        },
        ppmGas: {
            type: Number,
            required: [true, 'El PPM del gas es obligatorio'],
            min: [0, 'El PPM del gas no puede ser menor que 0'],
        },
        tipoGas: {
            type: String,
            required: [true, 'El tipo de gas es obligatorio'],
            enum: ['CO', 'CO2', 'Metano', 'Propano', 'Butano', 'GLP', 'Otros'],
        },
    },
    {
        timestamps: true,
    },
    {
        collection: 'sensores',
    }
);

const Sensor = mongoose.model('Sensor', sensorSchema, 'sensores');
export default Sensor;
