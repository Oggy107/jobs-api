const { BadRequestError } = require('../errors/customErrors');
const Job = require('../models/jobs');

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: res.locals.user.id}).sort('createdAt');
    res.json({number: jobs.length, jobs});
}

const getJob = async (req, res) => {
    try {
        const job = await Job.findOne({_id: req.params.id, createdBy: res.locals.user.id});
        res.json({job});
    } catch (error) {
        throw new BadRequestError(error.message);
    }
}

const createjob = async (req, res) => {
    req.body.createdBy = res.locals.user.id;

    try {
        const job = await Job.create(req.body);
        res.json({job});
    } catch (error) {
        throw new BadRequestError(error.message);
    }
}

const updateJob = async (req, res) => {
    try {
        const result = await Job.updateOne({_id: req.params.id, createdBy: res.locals.user.id}, req.body, {runValidators: true});
        res.json(result);
    } catch (error) {
        throw new BadRequestError(error.message);
    }
}

const deleteJob = async (req, res) => {
    try {
        const result = await Job.deleteOne({_id: req.params.id, createdBy: res.locals.user.id});
        res.json({result});
    } catch (error) {
        throw new BadRequestError(error.message);
    }
}

module.exports = {
    getAllJobs,
    getJob,
    createjob,
    updateJob,
    deleteJob
}