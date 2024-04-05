// routes/admin.routes.js
import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/admin.controller.js";
import { auth, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/getUsers", auth, verifyAdmin, getUsers);
router.post("/createUser", auth, verifyAdmin, createUser);
router.put("/updateUser/:id", auth, verifyAdmin, updateUser);
router.delete("/deleteUser/:id", auth, verifyAdmin, deleteUser);

export default router;
