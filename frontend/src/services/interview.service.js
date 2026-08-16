import api from "../api/axios";

export const getInterviewHistory = async () => {

    console.log("🔥 HISTORY REQUEST START");

    const response = await api.get(
        "/interview/history"
    );

    console.log(
        "🔥 HISTORY RESPONSE:",
        response.status,
        response.data
    );

    if (!response.data.success) {
        throw new Error(
            response.data.message ||
            "Unable to fetch interview history"
        );
    }

    return response.data.data;
};