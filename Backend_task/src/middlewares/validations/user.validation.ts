import Joi from 'joi';
import { IUser } from '../../interfaces/entity/IUser';

export const validateUserData = (user: IUser) => {
    const userSchema = Joi.object<IUser>({
        name: Joi.string().required().regex(/^[A-Za-z\s]+$/).messages({
            'string.empty': 'Name is required',
            'string.pattern.base': 'Name can only contain letters and spaces',
          }),
          email: Joi.string().email().required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Email is not valid',
          }),
          phone: Joi.string().required().length(10).pattern(/^[0-9]+$/).messages({
            'string.empty': 'Phone number is required',
            'string.length': 'Phone number must be a 10-digit number',
            'string.pattern.base': 'Phone number must contain only numbers',
          }),
          password: Joi.string().required().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
          }),
          address: Joi.string().required().messages({
            'string.empty': 'Address is required',
          }),
          fileLink: Joi.string().uri().required().messages({
            'string.empty': 'File link is required'
          }),
    });

    return userSchema.validate(user);
}