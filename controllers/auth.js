const bcrypt = require('bcrypt');

const { BadRequestError, NotFoundError, AuthenticationError } = require('../errors/customErrors');
const User = require('../models/Users');

const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({token: user.genJWT()});
    } catch (error) {
        throw new BadRequestError(error.message);
    }
}

const login = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password)
        throw new BadRequestError("must provide Username and password");

    const user = await User.findOne({username: username});

    if (!user || !await user.verify(password))
        throw new AuthenticationError("invalid credentials");

    res.send({token: user.genJWT()});
}

module.exports = {
    register,
    login
}