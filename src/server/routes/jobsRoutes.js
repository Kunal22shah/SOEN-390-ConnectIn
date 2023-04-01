const express = require("express");
const router = express.Router();
const jobsControllers = require("../controllers/jobsController");

router.get('/', jobsControllers.getAllJobs);
router.post('/', jobsControllers.getAllJobsWithFilter)
router.get('/:jobId', jobsControllers.getJobDetails)
router.get('/edit/:jobId',jobsControllers.getJobDetails)
router.post('/edit/:jobId',jobsControllers.updateJobData)
router.post("/create", jobsControllers.createJob);
router.post('/delete/:jobId', jobsControllers.deleteJob)
 

module.exports = router;
