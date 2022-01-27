const express = require('express');

const {
    getAllJobs,
    getJob,
    createjob,
    updateJob,
    deleteJob
} = require('../controllers/jobs');

const router = express.Router();

router.route('/').get(getAllJobs).post(createjob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;