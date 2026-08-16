import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import "./InterviewRoom.css";

function InterviewRoom() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [interview, setInterview] = useState(null);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);

    const [editorWidth, setEditorWidth] = useState(50);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // ================================
    // FETCH INTERVIEW
    // ================================

    const fetchInterview = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/interview/${id}`
            );

            if (!response.data.success) {
                throw new Error(
                    response.data.message ||
                    "Unable to fetch interview"
                );
            }

            const data = response.data.data;

            setInterview(data);

            // Load starter code
            if (data.question?.starter_code) {
                setCode(
                    data.question.starter_code
                );
            }

        } catch (error) {
            console.error(
                "FETCH INTERVIEW ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to load interview"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInterview();
    }, [id]);


    // ================================
    // SUBMIT CODE
    // ================================

  const handleSubmit = async () => {
    if (submitting) {
        return;
    }

    if (!code.trim()) {
        setError(
            "Please write your code before submitting."
        );
        return;
    }

    try {
        setSubmitting(true);
        setError("");
        setResult(null);


        const response = await api.post(
            `/interview/${id}/submit`,
            {
                code,
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
                "Code submission failed"
            );
        }

        const submission =
            response.data.data;

        setResult(submission);

        

        // =====================================
        // INTERVIEW COMPLETED
        // =====================================

        if (
            submission.status ===
                "completed" ||
            (
                submission.total > 0 &&
                submission.passed ===
                    submission.total
            )
        ) {
            

            navigate(
                `/interview/${id}/result`
            );

            return;
        }

        // =====================================
        // NOT COMPLETED
        // =====================================

        setError(
            `Tests passed: ${submission.passed}/${submission.total}. ` +
            "All hidden tests must pass to complete the interview."
        );

    } catch (error) {

        console.error(
            "SUBMIT ERROR:",
            error
        );

        setError(
            error.response?.data?.message ||
            error.message ||
            "Code submission failed"
        );

    } finally {
        setSubmitting(false);
    }
};


    // ================================
    // KEYBOARD SHORTCUTS
    // ================================

    useEffect(() => {
        const handleKeyboard = (event) => {

            // Ctrl + Enter
            if (
                event.ctrlKey &&
                event.key === "Enter"
            ) {
                event.preventDefault();

                if (!submitting) {
                    handleSubmit();
                }
            }

            // F11
            if (event.key === "F11") {
                event.preventDefault();

                setIsMaximized(
                    (previous) =>
                        !previous
                );
            }

            // Escape
            if (
                event.key === "Escape" &&
                isMaximized
            ) {
                setIsMaximized(false);
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyboard
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyboard
            );
        };
    }, [
        code,
        submitting,
        isMaximized,
    ]);


    // ================================
    // RESIZE EDITOR
    // ================================

    useEffect(() => {
        if (!isDragging) {
            return;
        }

        const handleMouseMove = (event) => {

            const questionWidth =
                (event.clientX /
                    window.innerWidth) *
                100;

            if (
                questionWidth >= 30 &&
                questionWidth <= 70
            ) {
                setEditorWidth(
                    100 - questionWidth
                );
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener(
            "mousemove",
            handleMouseMove
        );

        window.addEventListener(
            "mouseup",
            handleMouseUp
        );

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMouseMove
            );

            window.removeEventListener(
                "mouseup",
                handleMouseUp
            );
        };
    }, [isDragging]);


    // ================================
    // LOADING
    // ================================

    if (loading) {
        return (
            <div className="interview-loading">

                <div className="loading-content">

                    <div className="loading-spinner">
                        ⏳
                    </div>

                    <p>
                        Loading interview...
                    </p>

                </div>

            </div>
        );
    }


    // ================================
    // ERROR
    // ================================

    if (error && !interview) {
        return (
            <div className="interview-error-page">

                <div className="error-box">

                    <h1>
                        Unable to Load Interview
                    </h1>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        Back to Dashboard
                    </button>

                </div>

            </div>
        );
    }


    const question =
        interview?.question;


    // ================================
    // MAIN UI
    // ================================

    return (
        <div className="interview-room">

            {/* ================= NAVBAR ================= */}

            {!isMaximized && (
                <nav className="interview-navbar">

                    <button
                        className="logo"
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Interview
                        <span>AI</span>
                    </button>


                    <div className="interview-info">

                        <span className="info-badge">
                            {interview?.topic}
                        </span>

                        <span className="info-badge blue">
                            {interview?.difficulty}
                        </span>

                        <span className="info-badge">
                            {interview?.language}
                        </span>

                    </div>

                </nav>
            )}


            {/* ================= ERROR ================= */}

            {error && (
                <div className="error-message">

                    <span>
                        {error}
                    </span>

                    <button
                        onClick={() =>
                            setError("")
                        }
                    >
                        ×
                    </button>

                </div>
            )}


            {/* ================= MAIN ================= */}

            <div
                className={
                    isMaximized
                        ? "interview-main maximized"
                        : "interview-main"
                }
            >


                {/* ======================================
                    QUESTION PANEL
                ====================================== */}

                {!isMaximized && (
                    <section
                        className="question-panel"
                        style={{
                            width: `${100 - editorWidth}%`,
                        }}
                    >

                        <div className="question-label">
                            Coding Problem
                        </div>


                        <h1 className="question-title">
                            {question?.title ||
                                "Interview Question"}
                        </h1>


                        {/* Description */}

                        <div className="question-section">

                            <h2>
                                Problem Description
                            </h2>

                            <p>
                                {question?.description}
                            </p>

                        </div>


                        {/* Constraints */}

                        {question?.constraints?.length >
                            0 && (
                            <div className="question-section">

                                <h2>
                                    Constraints
                                </h2>

                                <ul className="constraints">

                                    {question.constraints.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <li
                                                key={
                                                    index
                                                }
                                            >
                                                {item}
                                            </li>
                                        )
                                    )}

                                </ul>

                            </div>
                        )}


                        {/* Input Format */}

                        {question?.input_format && (
                            <div className="question-section">

                                <h2>
                                    Input Format
                                </h2>

                                <p>
                                    {
                                        question.input_format
                                    }
                                </p>

                            </div>
                        )}


                        {/* Output Format */}

                        {question?.output_format && (
                            <div className="question-section">

                                <h2>
                                    Output Format
                                </h2>

                                <p>
                                    {
                                        question.output_format
                                    }
                                </p>

                            </div>
                        )}


                        {/* Examples */}

                        {question?.examples?.length >
                            0 && (
                            <div className="question-section">

                                <h2>
                                    Examples
                                </h2>


                                {question.examples.map(
                                    (
                                        example,
                                        index
                                    ) => (

                                        <div
                                            className="example"
                                            key={
                                                index
                                            }
                                        >

                                            <p className="example-number">
                                                Example{" "}
                                                {index +
                                                    1}
                                            </p>


                                            <div className="example-grid">

                                                <div>

                                                    <div className="example-title">
                                                        Input
                                                    </div>

                                                    <pre>
                                                        {
                                                            example.input
                                                        }
                                                    </pre>

                                                </div>


                                                <div>

                                                    <div className="example-title">
                                                        Output
                                                    </div>

                                                    <pre>
                                                        {
                                                            example.output
                                                        }
                                                    </pre>

                                                </div>

                                            </div>


                                            {example.explanation && (
                                                <div className="example-explanation">

                                                    <strong>
                                                        Explanation:
                                                    </strong>

                                                    <p>
                                                        {
                                                            example.explanation
                                                        }
                                                    </p>

                                                </div>
                                            )}

                                        </div>

                                    )
                                )}

                            </div>
                        )}

                    </section>
                )}


                {/* ======================================
                    RESIZE DIVIDER
                ====================================== */}

                {!isMaximized && (
                    <div
                        className="resize-divider"
                        onMouseDown={() =>
                            setIsDragging(
                                true
                            )
                        }
                    />
                )}


                {/* ======================================
                    CODE EDITOR
                ====================================== */}

                <section
                    className={
                        isMaximized
                            ? "editor-panel maximized"
                            : "editor-panel"
                    }
                    style={
                        !isMaximized
                            ? {
                                  width: `${editorWidth}%`,
                              }
                            : {}
                    }
                >


                    {/* EDITOR HEADER */}

                    <div className="editor-header">

                        <div className="editor-header-left">

                            <span className="editor-title">
                                Code Editor
                            </span>

                            <span className="language-badge">
                                {interview?.language ||
                                    "cpp"}
                            </span>

                        </div>


                        <div className="editor-actions">

                            <span className="shortcut">
                                Ctrl + Enter
                            </span>


                            <button
                                className="maximize-btn"
                                onClick={() =>
                                    setIsMaximized(
                                        (
                                            previous
                                        ) =>
                                            !previous
                                    )
                                }
                            >
                                {isMaximized
                                    ? "Exit Fullscreen"
                                    : "⛶ Maximize"}
                            </button>

                        </div>

                    </div>


                    {/* CODE AREA */}

                    <div className="code-container">

                        <textarea
                            className="code-editor"
                            value={code}
                            onChange={(event) =>
                                setCode(
                                    event.target.value
                                )
                            }
                            spellCheck="false"
                            placeholder="// Write your solution here..."
                        />

                    </div>


                    {/* EDITOR FOOTER */}

                    <div className="editor-bottom">

                        <span className="character-count">
                            {code.length}{" "}
                            characters
                        </span>


                        <button
                            className="submit-btn"
                            onClick={
                                handleSubmit
                            }
                            disabled={
                                submitting
                            }
                        >
                            {submitting
                                ? "Evaluating..."
                                : "Submit Code"}
                        </button>

                    </div>


                    {/* SUBMISSION RESULT */}

                    {result &&
                        !isMaximized && (
                            <div className="submission-result">

                                <h3>
                                    Submission Result
                                </h3>


                                <div className="result-grid">

                                    <div className="result-card">

                                        <span>
                                            Score
                                        </span>

                                        <strong>
                                            {
                                                result.score
                                            }
                                            %
                                        </strong>

                                    </div>


                                    <div className="result-card">

                                        <span>
                                            Passed
                                        </span>

                                        <strong className="passed">
                                            {
                                                result.passed
                                            }
                                        </strong>

                                    </div>


                                    <div className="result-card">

                                        <span>
                                            Failed
                                        </span>

                                        <strong className="failed">
                                            {
                                                result.failed
                                            }
                                        </strong>

                                    </div>

                                </div>


                                {result.evaluation && (
                                    <div className="evaluation-box">

                                        <h4>
                                            AI Evaluation
                                        </h4>

                                        <p>
                                            {
                                                result
                                                    .evaluation
                                                    .weaknesses
                                                    ?.join(
                                                        " "
                                                    )
                                            }
                                        </p>

                                    </div>
                                )}

                            </div>
                        )}

                </section>

            </div>

        </div>
    );
}

export default InterviewRoom;