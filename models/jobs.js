const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({

});

const job = mongoose.model('job', jobSchema);

module.exports = job;