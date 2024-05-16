import Joi from 'joi';
import AppError from '../utils/appError.js';

const Schema = Joi.object({
    name: Joi.string().required(),
    sub_title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    discount: Joi.number().required(),
    options: Joi.array().items(Joi.number()).required(),
});

export const productValidationMiddleware = (req, res, next) => {
    const result = Schema.validate(req.body);
    if (result?.error) throw new AppError(400, result.error.details[0].message.replace(/"/gi, ''));
    return next();
};
