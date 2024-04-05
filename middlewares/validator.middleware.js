// middlewares/validator.middleware.js
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

export const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};

export { registerSchema, loginSchema };
