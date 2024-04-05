// controllers/admin.controllers.js
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password, rol } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El correo ya existe" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword, rol });
    await newUser.save();

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, rol } = req.body;

    // Implementa la lógica para actualizar los detalles del usuario y manejar errores potenciales (e.g., usuario no encontrado, errores de validación, conflicto de correo electrónico)

    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Implementa la lógica para eliminar un usuario y manejar errores potenciales (e.g., usuario no encontrado)

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};

// Función para obtener un usuario por ID (opcional)

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};
