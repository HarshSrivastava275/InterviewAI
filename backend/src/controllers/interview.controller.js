import { startInterviewService, getInterviewService, submitInterviewCodeService, getInterviewResultService, getInterviewHistoryService, } from "../services/interview.service.js";

export const startInterview = async (req, res) => {
    try {
        const interview = await startInterviewService({
            userId: req.user._id,
            ...req.body,
        });

        return res.status(201).json({
            success: true,
            message: "Interview Started Successfully",
            data: interview,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getInterview = async (req, res) => {

    try {

        const interview =
            await getInterviewService({
                interviewId: req.params.id,
                userId: req.user._id,
            });

        return res.status(200).json({
            success: true,
            message: "Interview Fetched Successfully",
            data: interview,
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};


export const submitInterviewCode = async (req, res) => {

    try {

        const result =
            await submitInterviewCodeService({
                interviewId: req.params.id,
                userId: req.user._id,
                code: req.body.code,
            });


        return res.status(200).json({
            success: true,
            message: "Code Submitted Successfully",
            data: result,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getInterviewResult = async (req, res) => {

    try {

        const result = await getInterviewResultService({
            interviewId: req.params.id,
            userId: req.user._id,
        });

        return res.status(200).json({
            success: true,
            message: "Interview Result Fetched Successfully",
            data: result,
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};


// GET INTERVIEW HISTORY


export const getInterviewHistory = async (req, res) => {

    try {

        console.log(
            "HISTORY REQUEST USER:",
            req.user
        );

        const history =
            await getInterviewHistoryService({
                userId: req.user._id,
            });

        return res.status(200).json({

            success: true,

            message:
                "Interview History Fetched Successfully",

            data: history,

        });

    } catch (error) {

        console.error(
            "HISTORY CONTROLLER ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Unable to fetch interview history",

        });
    }
};