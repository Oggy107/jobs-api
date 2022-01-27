const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'must be provided'],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, 'must be provided'],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'must be provided'],
    }
}, {timestamps: true});

const Job = mongoose.model('job', jobSchema);

module.exports = Job;