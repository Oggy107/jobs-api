const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { BadRequestError, NotFoundError, AuthenticationError } = require('../errors/customErrors');
const user = require('../models/users');

const register = async (req, res) => {
    try {
        await user.validate(req.body);

        const hash = await bcrypt.hash(req.body.password, 10);

        req.body.password = hash;
        const newUser = await user.create(req.body);

        res.status(201).json(newUser);
    } catch (error) {
        throw new BadRequestError(error.message);
    }
}

const login = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password)
        throw new BadRequestError("must provide username and password");

    const existingUser = await user.findOne({username: username});

    if (!existingUser)
        throw new NotFoundError("No user found");

    const match = await bcrypt.compare(password, existingUser.password);

    if (!match)
        throw new AuthenticationError("Password not correct");

    const token = jwt.sign({username: existingUser.username, id: existingUser._id}, process.env.PRIVATE_KEY);

    res.send({token});
}

module.exports = {
    register,
    login
}