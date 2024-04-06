import { Joi } from "express-validation";

const registerSchema = Joi.object({
    username: Joi.string().required().min(3).max(20),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    rol: Joi.string().valid("user", "admin").optional(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
});

export { registerSchema, loginSchema };
