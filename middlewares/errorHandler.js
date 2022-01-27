const { CustomAPIError } = require('../errors/customErrors');

const errorHandler = (error, req, res, next) => {
    console.log('[ERROR]: ', error);

    if (error instanceof CustomAPIError)
        return res.status(error.statusCode).json({message: error.message});

    res.status(500).json({message: "Internal Server Error"});
}

module.exports = errorHandler;