const pdfParse = require('pdf-parse');
const generateInterviewReport = require('../services/ai.service')
const InterviewReportModel = require('../models/interviewReport.model')

async function generateInterviewReportController(req, res) {
    const { selfDescription, jobDescription } = req.body;

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const resumeText = resumeContent.text;

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeText,
        selfDescription,
        jobDescription
    });

    const interviewReport = await InterviewReportModel.create({
        user: req.user.id,
        resume: resumeText,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    });

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    });
}

module.exports = {
    generateInterviewReportController
}   
