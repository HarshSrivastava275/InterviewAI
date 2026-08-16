import axios from "axios";

const AI_SERVICE_URL =
    "http://127.0.0.1:8000";


// EXECUTE CODE


export const executeCode = async ({
    code,
    language,
    testCases,
}) => {
    try {
        const url =
            `${AI_SERVICE_URL}/api/code/execute`;

        console.log("URL:", url);
        console.log("Language:", language);
        console.log(
            "Test cases:",
            testCases?.length
        );

        const response = await axios.post(
            url,
            {
                code,
                language,
                test_cases: testCases,
            }
        );

        console.log(
            JSON.stringify(
                response.data,
                null,
                2
            )
        );

        if (!response.data.success) {
            throw new Error(
                response.data.message ||
                "Code execution failed"
            );
        }

        return response.data.data;

    } catch (error) {
        console.error(
            "\n CODE EXECUTION API ERROR"
        );

        console.error(
            "Status:",
            error.response?.status
        );

        console.error(
            "URL:",
            error.config?.url
        );

        console.error(
            "Response:",
            error.response?.data
        );

        console.error(
            "Message:",
            error.message
        );

        throw error;
    }
};



// EVALUATE CODE


export const evaluateCode = async ({
    question,
    candidateCode,
    language,
    executionResult,
}) => {
    try {
        const url =
            `${AI_SERVICE_URL}/api/evaluation/evaluate`;

        console.log("URL:", url);

        const response = await axios.post(
            url,
            {
                question,
                candidate_code:
                    candidateCode,
                language,
                execution_result:
                    executionResult,
            }
        );
        console.log(
            JSON.stringify(
                response.data,
                null,
                2
            )
        );

        if (!response.data.success) {
            throw new Error(
                response.data.message ||
                "AI evaluation failed"
            );
        }

        return response.data.data;

    } catch (error) {
        console.error(
            "\n AI EVALUATION ERROR"
        );

        console.error(
            "Status:",
            error.response?.status
        );

        console.error(
            "URL:",
            error.config?.url
        );

        console.error(
            "Response:",
            error.response?.data
        );

        console.error(
            "Message:",
            error.message
        );

        throw error;
    }
};