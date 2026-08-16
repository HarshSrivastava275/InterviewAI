import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import "./Result.css";

function Result() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // FETCH RESULT
  

    const fetchResult = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/interview/${id}/result`
            );

            if (!response.data.success) {
                throw new Error(
                    response.data.message ||
                    "Unable to fetch result"
                );
            }

            setResult(response.data.data);

        } catch (error) {
            console.error(
                "RESULT FETCH ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to load result"
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResult();
    }, [id]);


    // LOADING


    if (loading) {
        return (
            <div className="result-loading">

                <div className="result-loading-box">

                    <div className="result-spinner">
                        ⏳
                    </div>

                    <h2>
                        Preparing your result
                    </h2>

                    <p>
                        Analyzing your interview performance...
                    </p>

                </div>

            </div>
        );
    }


 
    // ERROR
   

    if (error || !result) {
        return (
            <div className="result-error">

                <div className="result-error-box">

                    <div className="error-icon">
                        !
                    </div>

                    <h1>
                        Unable to Load Result
                    </h1>

                    <p>
                        {error ||
                            "Result not found"}
                    </p>

                    <div className="error-actions">

                        <button
                            className="secondary-action"
                            onClick={() =>
                                navigate(
                                    "/dashboard"
                                )
                            }
                        >
                            ← Dashboard
                        </button>

                        <button
                            className="primary-action"
                            onClick={fetchResult}
                        >
                            Try Again
                        </button>

                    </div>

                </div>

            </div>
        );
    }

 
    // RESULT DATA
  

    const evaluation =
        result.evaluation || {};

    const score =
        result.score ?? 0;

    const executionScore =
        result.executionScore ??
        0;

    const aiScore =
        result.aiScore ??
        evaluation.correctness_score ??
        0;

    const status =
        result.status ||
        "completed";


   
    // EXECUTION RESULT
  

    const executionResult =
        result.executionResult || {
            total:
                result.total ?? 0,

            passed:
                result.passed ?? 0,

            failed:
                result.failed ?? 0,

            results:
                result.results ?? [],
        };


    const tests =
        executionResult.results || [];


  
    // AI EVALUATION
   

    const strengths =
        evaluation.strengths || [];

    const weaknesses =
        evaluation.weaknesses || [];

    const suggestions =
        evaluation.suggestions || [];


  
    // MAIN UI
   

    return (
        <div className="result-page">

            {/* ======================================
                NAVBAR
            ====================================== */}

            <nav className="result-navbar">

                <button
                    className="result-logo"
                    onClick={() =>
                        navigate("/")
                    }
                >
                    Interview
                    <span>AI</span>
                </button>

                <button
                    className="dashboard-btn"
                    onClick={() =>
                        navigate(
                            "/dashboard"
                        )
                    }
                >
                    Dashboard
                </button>

            </nav>


            {/* ======================================
                CONTENT
            ====================================== */}

            <main className="result-container">


                {/* ==================================
                    RESULT HEADER
                ================================== */}

                <section className="result-hero">

                    <div className="result-header">

                        <div className="result-heading">

                            <p className="result-label">
                                Interview Result
                            </p>

                            <h1>
                                {result.question?.title ||
                                    "Coding Interview"}
                            </h1>

                            <div className="result-meta">

                                <span>
                                    {result.topic ||
                                        "Technical"}
                                </span>

                                <span>
                                    {result.difficulty ||
                                        "Medium"}
                                </span>

                                <span>
                                    {result.language ||
                                        "C++"}
                                </span>

                            </div>

                        </div>


                        <div
                            className={
                                status === "completed"
                                    ? "completed-badge"
                                    : "completed-badge pending"
                            }
                        >
                            <span>
                                {status ===
                                "completed"
                                    ? "✓"
                                    : "!"}
                            </span>

                            {status ===
                            "completed"
                                ? "Completed"
                                : "In Progress"}
                        </div>

                    </div>


                    {/* ==========================
                        SCORE OVERVIEW
                    ========================== */}

                    <div className="score-overview">

                        <div className="score-main">

                            <span>
                                Final Score
                            </span>

                            <strong>
                                {score}%
                            </strong>

                        </div>


                        <div className="score-item">

                            <span>
                                Execution
                            </span>

                            <strong>
                                {executionScore}%
                            </strong>

                        </div>


                        <div className="score-item">

                            <span>
                                AI Score
                            </span>

                            <strong>
                                {aiScore}%
                            </strong>

                        </div>

                    </div>

                </section>


                {/* ==================================
                    EXECUTION
                ================================== */}

                <section className="result-section">

                    <div className="section-heading">

                        <div>

                            <p>
                                Execution
                            </p>

                            <h2>
                                Test Case Results
                            </h2>

                        </div>

                    </div>


                    <div className="test-summary">

                        <div className="test-stat">

                            <span>
                                Total Tests
                            </span>

                            <strong>
                                {executionResult.total}
                            </strong>

                        </div>


                        <div className="test-stat passed-stat">

                            <span>
                                Passed
                            </span>

                            <strong>
                                {executionResult.passed}
                            </strong>

                        </div>


                        <div className="test-stat failed-stat">

                            <span>
                                Failed
                            </span>

                            <strong>
                                {executionResult.failed}
                            </strong>

                        </div>

                    </div>


                    {/* TEST LIST */}

                    {tests.length > 0 && (

                        <div className="test-list">

                            {tests.map(
                                (test, index) => (

                                    <div
                                        className="test-item"
                                        key={index}
                                    >

                                        <div className="test-left">

                                            <div
                                                className={
                                                    test.passed
                                                        ? "test-icon passed"
                                                        : "test-icon failed"
                                                }
                                            >
                                                {test.passed
                                                    ? "✓"
                                                    : "✕"}
                                            </div>

                                            <div>

                                                <strong>
                                                    Test Case{" "}
                                                    {test.test_case ||
                                                        index + 1}
                                                </strong>

                                                <span>
                                                    {test.status ||
                                                        (
                                                            test.passed
                                                                ? "passed"
                                                                : "failed"
                                                        )}
                                                </span>

                                            </div>

                                        </div>


                                        <div
                                            className={
                                                test.passed
                                                    ? "test-status passed-text"
                                                    : "test-status failed-text"
                                            }
                                        >
                                            {test.passed
                                                ? "Passed"
                                                : "Failed"}
                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>


                {/* ==================================
                    COMPLEXITY
                ================================== */}

                <section className="result-section">

                    <div className="section-heading">

                        <div>

                            <p>
                                Performance
                            </p>

                            <h2>
                                Complexity Analysis
                            </h2>

                        </div>

                    </div>


                    <div className="complexity-grid">

                        <div className="complexity-card">

                            <span>
                                Time Complexity
                            </span>

                            <strong>
                                {evaluation.time_complexity ||
                                    "Not available"}
                            </strong>

                        </div>


                        <div className="complexity-card">

                            <span>
                                Space Complexity
                            </span>

                            <strong>
                                {evaluation.space_complexity ||
                                    "Not available"}
                            </strong>

                        </div>

                    </div>

                </section>


                {/* ==================================
                    AI EVALUATION
                ================================== */}

                <section className="result-section">

                    <div className="section-heading">

                        <div>

                            <p>
                                AI Feedback
                            </p>

                            <h2>
                                Solution Analysis
                            </h2>

                        </div>

                    </div>


                    {/* STRENGTHS */}

                    {strengths.length > 0 && (

                        <div className="feedback-card strengths-card">

                            <div className="feedback-header">

                                <div className="feedback-icon">
                                    ✓
                                </div>

                                <div>

                                    <h3>
                                        Strengths
                                    </h3>

                                    <span>
                                        What you did well
                                    </span>

                                </div>

                            </div>


                            <ul>

                                {strengths.map(
                                    (item, index) => (

                                        <li key={index}>

                                            <span>
                                                ✓
                                            </span>

                                            {item}

                                        </li>

                                    )
                                )}

                            </ul>

                        </div>

                    )}


                    {/* WEAKNESSES */}

                    {weaknesses.length > 0 && (

                        <div className="feedback-card weaknesses-card">

                            <div className="feedback-header">

                                <div className="feedback-icon">
                                    !
                                </div>

                                <div>

                                    <h3>
                                        Areas to Improve
                                    </h3>

                                    <span>
                                        Things you can improve
                                    </span>

                                </div>

                            </div>


                            <ul>

                                {weaknesses.map(
                                    (item, index) => (

                                        <li key={index}>

                                            <span>
                                                !
                                            </span>

                                            {item}

                                        </li>

                                    )
                                )}

                            </ul>

                        </div>

                    )}


                    {/* SUGGESTIONS */}

                    {suggestions.length > 0 && (

                        <div className="feedback-card suggestions-card">

                            <div className="feedback-header">

                                <div className="feedback-icon">
                                    ✦
                                </div>

                                <div>

                                    <h3>
                                        AI Suggestions
                                    </h3>

                                    <span>
                                        How you can improve
                                    </span>

                                </div>

                            </div>


                            <ol>

                                {suggestions.map(
                                    (item, index) => (

                                        <li key={index}>

                                            <span>
                                                {index + 1}
                                            </span>

                                            {item}

                                        </li>

                                    )
                                )}

                            </ol>

                        </div>

                    )}


                    {/* NO AI FEEDBACK */}

                    {strengths.length === 0 &&
                        weaknesses.length === 0 &&
                        suggestions.length === 0 && (

                            <div className="empty-feedback">

                                <div>
                                    🤖
                                </div>

                                <h3>
                                    AI feedback unavailable
                                </h3>

                                <p>
                                    No detailed evaluation
                                    was returned for this
                                    submission.
                                </p>

                            </div>

                        )}

                </section>


                {/* ==================================
                    PROBLEM
                ================================== */}

                <section className="result-section">

                    <div className="section-heading">

                        <div>

                            <p>
                                Problem
                            </p>

                            <h2>
                                Interview Question
                            </h2>

                        </div>

                    </div>


                    <div className="problem-card">

                        <h3>
                            {result.question?.title ||
                                "Coding Problem"}
                        </h3>

                        <p>
                            {result.question?.description ||
                                "Problem description unavailable."}
                        </p>

                    </div>

                </section>


                {/* ==================================
                    ACTIONS
                ================================== */}

                <div className="result-actions">

                    <button
                        className="secondary-action"
                        onClick={() =>
                            navigate(
                                "/dashboard"
                            )
                        }
                    >
                        ← Dashboard
                    </button>


                    <button
                        className="primary-action"
                        onClick={() =>
                            navigate(
                                "/interview"
                            )
                        }
                    >
                        Start New Interview

                        <span>
                            →
                        </span>

                    </button>

                </div>

            </main>

        </div>
    );
}

export default Result;