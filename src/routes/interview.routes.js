const express = require('express');
const interviewRouter = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const interviewController = require('../controllers/interview.controller');
const upload = require('../middleware/file.middleware')

/**
 * @route POST /api/interview
 * @desc Generate an interview report for a candidate based on their resume, self description and job description
 * @access private
 */

interviewRouter.post('/' , authMiddleware, upload.single('resume'), interviewController.generateInterviewReportController) 

module.exports = interviewRouter
