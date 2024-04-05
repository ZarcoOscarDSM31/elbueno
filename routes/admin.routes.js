// routes/admin.routes.js
import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/admin.controller.js";
import { auth, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/users", auth, verifyAdmin, getUsers);
router.post("/users", auth, verifyAdmin, createUser);
router.put("/users/:id", auth, verifyAdmin, updateUser);
router.delete("/users/:id", auth, verifyAdmin, deleteUser);

export default router;
