import Interview from "../models/Interview.js";

export const submitCode = async (req, res) => {
    try {

        const { interviewId, code } = req.body;

        if (!interviewId || !code) {
            return res.status(400).json({
                success: false,
                message: "Interview ID and code are required",
            });
        }

        const interview = await Interview.findById(
            interviewId
        );

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found",
            });
        }

        if (!interview.question) {
            return res.status(400).json({
                success: false,
                message: "Interview question not generated",
            });
        }

        const hiddenTestCases =
            interview.question.hidden_test_cases;

        if (
            !hiddenTestCases ||
            hiddenTestCases.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "No test cases available",
            });
        }


        return res.status(200).json({
            success: true,
            message: "Submission received",
            data: {
                interviewId,
                testCases: hiddenTestCases.length,
            },
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};