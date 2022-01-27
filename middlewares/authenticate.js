const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('../errors/customErrors');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer'))
        throw new AuthenticationError("No Token provided");

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
        res.locals.user = {username: decodedToken.username, id: decodedToken.id};
    } catch (error) {
        throw new AuthenticationError(error.message);
    }

    next();
}

module.exports = authenticate;