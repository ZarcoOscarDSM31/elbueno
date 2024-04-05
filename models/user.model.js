import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres'],
        maxlength: [30, 'El nombre de usuario no puede exceder los 30 caracteres'],
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, introduce un correo electrónico válido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    },
    rol: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
}, { timestamps: true }, 
{
    collection: "users"
});

const User = mongoose.model("User", userSchema);

export default User;
