"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserData = void 0;
const joi_1 = __importDefault(require("joi"));
const validateUserData = (user) => {
    const userSchema = joi_1.default.object({
        name: joi_1.default.string().required().regex(/^[A-Za-z\s]+$/).messages({
            'string.empty': 'Name is required',
            'string.pattern.base': 'Name can only contain letters and spaces',
        }),
        email: joi_1.default.string().email().required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Email is not valid',
        }),
        phone: joi_1.default.string().required().length(10).pattern(/^[0-9]+$/).messages({
            'string.empty': 'Phone number is required',
            'string.length': 'Phone number must be a 10-digit number',
            'string.pattern.base': 'Phone number must contain only numbers',
        }),
        password: joi_1.default.string().required().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        }),
        address: joi_1.default.string().required().messages({
            'string.empty': 'Address is required',
        }),
        fileLink: joi_1.default.string().uri().required().messages({
            'string.empty': 'File link is required'
        }),
    });
    return userSchema.validate(user);
};
exports.validateUserData = validateUserData;
