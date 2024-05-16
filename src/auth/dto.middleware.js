import Joi from 'joi';
import AppError from '../utils/appError.js';

const updateSchema = Joi.object({
    email: Joi.string().email().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    company: Joi.string().required(),
    address: Joi.string().required(),
    number: Joi.number().required(),
    state: Joi.string().required(),
    zip_code: Joi.number().required(),
    license_number: Joi.string().required(),
});

const createSchema = updateSchema.keys({
    type: Joi.string().valid('lab', 'clinic').required(),
});

export const signupValidationMiddleware = (req, res, next) => {
    const result = createSchema.validate(req.body);
    if (result?.error) throw new AppError(400, result.error.details[0].message.replace(/"/gi, ''));
    return next();
};

export const updateValidationMiddleware = (req, res, next) => {
    const result = createSchema.validate(req.body);
    if (result?.error) throw new AppError(400, result.error.details[0].message.replace(/"/gi, ''));
    return next();
};
