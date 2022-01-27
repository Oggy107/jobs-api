const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.genJWT = function() {
    return jwt.sign({username: this.username, id: this._id}, process.env.PRIVATE_KEY, {expiresIn: '10 days'});
}

userSchema.methods.verify = function(password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('user', userSchema);

module.exports = User;