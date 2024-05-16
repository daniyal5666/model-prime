import Joi from 'joi';
import AppError from '../utils/appError.js';

const updateSettingsSchema = Joi.object({
    email_when_pillow_ready: Joi.boolean().required(),
    email_when_someone_answer: Joi.boolean().required(),
    email_when_someone_mentions: Joi.boolean().required(),
    new_launches: Joi.boolean().required(),
    monthly_updates: Joi.boolean().required(),
    subscribe_newsLetter: Joi.boolean().required(),
});

export const signupValidationMiddleware = (req, res, next) => {
    const result = updateSettingsSchema.validate(req.body);
    if (result?.error) throw new AppError(400, result.error.details[0].message.replace(/"/gi, ''));
    return next();
};
