const ApiResponse = (res, statusCode = 200, data = [], message) => {
    const response = {
        success: true,
        statusCode,
        message,
        data,
    };

    return res.status(statusCode).json(response);
};

export default ApiResponse;
