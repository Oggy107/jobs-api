const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'must be provided'],
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: [true, 'must be provided'],
    },
    email: {
        type: String,
        required: [true, 'must be provided'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'invalid email'],
        unique: true,
    }
});

const user = mongoose.model('user', userSchema);

module.exports = user;