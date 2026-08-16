import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./History.css";
import { getInterviewHistory } from "../services/interview.service";

function History() {

    const navigate = useNavigate();

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchHistory = async () => {

        try {

           

            setLoading(true);
            setError("");

            const data =
                await getInterviewHistory();

            console.log(
                " HISTORY DATA:",
                data
            );

            setHistory(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                " HISTORY ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to load history"
            );

            setHistory([]);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchHistory();

    }, []);


    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );
    };


    if (loading) {

        return (
            <div className="history-page">

                <div className="history-loading">
                    Loading interview history...
                </div>

            </div>
        );
    }


    return (
        <div className="history-page">

            {/* NAVBAR */}

            <nav className="history-navbar">

                <button
                    className="history-logo"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    Interview
                    <span>AI</span>
                </button>


                <button
                    className="history-dashboard-btn"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    Dashboard
                </button>

            </nav>


            {/* CONTENT */}

            <main className="history-container">

                <div className="history-header">

                    <div>

                        <p className="history-label">
                            INTERVIEW HISTORY
                        </p>

                        <h1>
                            Your Interviews
                        </h1>

                        <p className="history-subtitle">
                            Review your previous
                            interview attempts and
                            performance.
                        </p>

                    </div>


                    <button
                        className="new-interview-btn"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        + New Interview
                    </button>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="history-error">

                        {error}

                    </div>

                )}


                {/* EMPTY */}

                {!error &&
                    history.length === 0 && (

                        <div className="history-empty">

                            <div className="empty-icon">
                                ◫
                            </div>

                            <h2>
                                No interviews yet
                            </h2>

                            <p>
                                Start your first AI
                                interview to see it
                                here.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/dashboard")
                                }
                            >
                                Start Interview
                            </button>

                        </div>
                    )}


                {/* HISTORY LIST */}

                {history.length > 0 && (

                    <div className="history-list">

                        {history.map(
                            (interview) => (

                                <div
                                    className="history-card"
                                    key={
                                        interview.interviewId
                                    }
                                >

                                    <div className="history-card-main">

                                        <div className="history-card-title">

                                            <h2>
                                                {
                                                    interview.title ||
                                                    "Coding Interview"
                                                }
                                            </h2>

                                            <span
                                                className={
                                                    interview.status ===
                                                    "completed"
                                                        ? "status completed"
                                                        : "status progress"
                                                }
                                            >
                                                {
                                                    interview.status ===
                                                    "completed"
                                                        ? "Completed"
                                                        : "In Progress"
                                                }
                                            </span>

                                        </div>


                                        <div className="history-meta">

                                            <span>
                                                {
                                                    interview.topic ||
                                                    "-"
                                                }
                                            </span>

                                            <span>
                                                {
                                                    interview.difficulty ||
                                                    "-"
                                                }
                                            </span>

                                            <span>
                                                {
                                                    interview.language ||
                                                    "-"
                                                }
                                            </span>

                                            <span>
                                                {
                                                    formatDate(
                                                        interview.createdAt
                                                    )
                                                }
                                            </span>

                                        </div>

                                    </div>


                                    <div className="history-card-right">

                                        <div className="history-score">

                                            <strong>
                                                {
                                                    interview.score ??
                                                    0
                                                }%
                                            </strong>

                                            <span>
                                                Score
                                            </span>

                                        </div>


                                        {interview.status ===
                                            "completed" && (

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/interview/${interview.interviewId}/result`
                                                    )
                                                }
                                            >
                                                View Result →
                                            </button>

                                        )}

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </main>

        </div>
    );
}

export default History;