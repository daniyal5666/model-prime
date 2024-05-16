import AppError from '../utils/appError.js';

const errorMiddleware = (err, _req, res, _next) => {
    if (err instanceof AppError)
        return res.status(err.statusCode).json({ success: false, statusCode: err.statusCode, message: err.error, data: [] });

    console.log(err);

    return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'something went wrong. internal server error.',
        data: [],
    });
};

export default errorMiddleware;
