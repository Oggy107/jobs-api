const getAllJobs = (req, res) => {
    res.send("All jobs");
}

const getJob = (req, res) => {
    res.send("single job");
}

const createjob = (req, res) => {
    res.send("create job");
}

const updateJob = (req, res) => {
    res.send("update job");
}

const deleteJob = (req, res) => {
    res.send("delete job");
}

module.exports = {
    getAllJobs,
    getJob,
    createjob,
    updateJob,
    deleteJob
}