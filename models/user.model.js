// models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    rol: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
