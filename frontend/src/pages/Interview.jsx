import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Interview() {
    const navigate = useNavigate();

    const [topic, setTopic] =
        useState("Arrays");

    const [difficulty, setDifficulty] =
        useState("Medium");

    const [language, setLanguage] =
        useState("cpp");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    const startInterview = async () => {
        try {
            setLoading(true);
            setError("");

            const response =
                await api.post(
                    "/interview/start",
                    {
                        topic,
                        difficulty,
                        language,
                    }
                );

            if (!response.data.success) {
                throw new Error(
                    response.data.message ||
                    "Unable to start interview"
                );
            }

            const interview =
                response.data.data;

            navigate(
                `/interview/${interview._id}`
            );

        } catch (error) {

            console.error(
                "START INTERVIEW ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to start interview"
            );

        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {/* =====================================================
                MOBILE RESPONSIVE CSS
                ONLY APPLIES BELOW 480px

                LAPTOP / DESKTOP:
                ORIGINAL DESIGN IS UNTOUCHED
            ===================================================== */}

            <style>
                {`

                @media only screen and (max-width: 480px) {

                    /* ==============================
                       PAGE
                    ============================== */

                    .interview-page-mobile {
                        width: 100% !important;
                        min-height: 100vh !important;
                        overflow-x: hidden !important;
                    }


                    /* ==============================
                       NAVBAR
                    ============================== */

                    .interview-nav-mobile {
                        height: 60px !important;
                        padding: 0 14px !important;
                    }


                    .interview-logo-mobile {
                        font-size: 20px !important;
                    }


                    /* ==============================
                       MAIN
                    ============================== */

                    .interview-main-mobile {
                        width: 100% !important;
                        max-width: 100% !important;

                        padding:
                            28px 14px 40px !important;

                        box-sizing:
                            border-box !important;
                    }


                    /* ==============================
                       HEADER
                    ============================== */

                    .interview-header-mobile {
                        margin-bottom:
                            24px !important;
                    }


                    .interview-label-mobile {
                        font-size:
                            10px !important;

                        letter-spacing:
                            .1em !important;

                        margin-bottom:
                            8px !important;
                    }


                    .interview-title-mobile {
                        font-size:
                            28px !important;

                        line-height:
                            1.15 !important;

                        margin:
                            7px 0 10px !important;
                    }


                    .interview-description-mobile {
                        font-size:
                            12px !important;

                        line-height:
                            1.6 !important;

                        margin:
                            0 !important;
                    }


                    /* ==============================
                       ERROR
                    ============================== */

                    .interview-error-mobile {
                        width: 100% !important;

                        box-sizing:
                            border-box !important;

                        padding:
                            11px !important;

                        margin-bottom:
                            12px !important;

                        font-size:
                            12px !important;

                        line-height:
                            1.5 !important;

                        overflow-wrap:
                            anywhere !important;
                    }


                    /* ==============================
                       CONFIGURATION CARD
                    ============================== */

                    .interview-card-mobile {
                        width: 100% !important;

                        box-sizing:
                            border-box !important;

                        padding:
                            19px 15px !important;

                        border-radius:
                            14px !important;
                    }


                    /* ==============================
                       SELECT GROUP
                    ============================== */

                    .interview-select-group-mobile {
                        width: 100% !important;

                        margin-bottom:
                            16px !important;
                    }


                    .interview-select-label-mobile {
                        font-size:
                            12px !important;

                        margin-bottom:
                            7px !important;
                    }


                    .interview-select-mobile {
                        width: 100% !important;

                        min-height:
                            45px !important;

                        padding:
                            11px !important;

                        font-size:
                            13px !important;

                        box-sizing:
                            border-box !important;
                    }


                    /* ==============================
                       START BUTTON
                    ============================== */

                    .interview-button-mobile {
                        width: 100% !important;

                        min-height:
                            46px !important;

                        margin-top:
                            5px !important;

                        padding:
                            12px !important;

                        font-size:
                            13px !important;

                        box-sizing:
                            border-box !important;
                    }


                    /* ==============================
                       ERROR / LONG TEXT
                    ============================== */

                    .interview-error-mobile {
                        overflow-wrap:
                            anywhere !important;
                        word-break:
                            break-word !important;
                    }


                    /* ==============================
                       INFO CARDS
                    ============================== */

                    .interview-info-mobile {
                        width: 100% !important;

                        grid-template-columns:
                            1fr !important;

                        gap:
                            10px !important;

                        margin-top:
                            14px !important;
                    }


                    .interview-info-card-mobile {
                        width: 100% !important;

                        box-sizing:
                            border-box !important;

                        padding:
                            14px !important;
                    }


                    .interview-info-icon-mobile {
                        font-size:
                            19px !important;
                    }


                    .interview-info-title-mobile {
                        font-size:
                            12px !important;

                        margin-top:
                            6px !important;
                    }


                    .interview-info-text-mobile {
                        font-size:
                            10px !important;

                        line-height:
                            1.5 !important;
                    }
                }


                /* =====================================================
                   VERY SMALL PHONES
                   ONLY BELOW 360px
                ===================================================== */

                @media only screen and (max-width: 360px) {

                    .interview-main-mobile {
                        padding:
                            24px 10px 35px !important;
                    }


                    .interview-title-mobile {
                        font-size:
                            26px !important;
                    }


                    .interview-description-mobile {
                        font-size:
                            11px !important;
                    }


                    .interview-card-mobile {
                        padding:
                            16px 12px !important;
                    }


                    .interview-select-mobile {
                        font-size:
                            12px !important;
                    }


                    .interview-button-mobile {
                        font-size:
                            12px !important;
                    }
                }

                `}
            </style>


            {/* =====================================================
                PAGE
            ===================================================== */}

            <div
                className="interview-page-mobile"
                style={{
                    minHeight: "100vh",
                    background: "#020617",
                    color: "#f8fafc",
                }}
            >


                {/* =================================================
                    NAVBAR
                ================================================= */}

                <nav
                    className="interview-nav-mobile"
                    style={{
                        height: 66,
                        borderBottom:
                            "1px solid #1e293b",
                        padding: "0 5%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >

                    <button
                        className="interview-logo-mobile"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        style={{
                            background:
                                "transparent",
                            border: "none",
                            color: "white",
                            fontSize: 22,
                            fontWeight: 800,
                        }}
                    >
                        Interview

                        <span
                            style={{
                                color: "#3b82f6",
                            }}
                        >
                            AI
                        </span>

                    </button>

                </nav>


                {/* =================================================
                    MAIN
                ================================================= */}

                <main
                    className="interview-main-mobile"
                    style={{
                        width: "90%",
                        maxWidth: 850,
                        margin: "auto",
                        padding: "60px 0",
                    }}
                >


                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div
                        className="interview-header-mobile"
                        style={{
                            textAlign: "center",
                            marginBottom: 35,
                        }}
                    >

                        <p
                            className="interview-label-mobile"
                            style={{
                                color: "#60a5fa",
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: ".12em",
                            }}
                        >
                            NEW INTERVIEW
                        </p>


                        <h1
                            className="interview-title-mobile"
                            style={{
                                fontSize: 38,
                                margin: "8px 0",
                            }}
                        >
                            Configure your interview
                        </h1>


                        <p
                            className="interview-description-mobile"
                            style={{
                                color: "#64748b",
                                lineHeight: 1.7,
                            }}
                        >
                            Choose your preferences and
                            let AI generate a coding
                            challenge for you.
                        </p>

                    </div>


                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (
                        <div
                            className="interview-error-mobile"
                            style={{
                                background:
                                    "rgba(239,68,68,.1)",
                                border:
                                    "1px solid rgba(239,68,68,.3)",
                                color: "#fca5a5",
                                padding: 12,
                                borderRadius: 8,
                                marginBottom: 15,
                            }}
                        >
                            {error}
                        </div>
                    )}


                    {/* =================================================
                        CONFIGURATION CARD
                    ================================================= */}

                    <div
                        className="interview-card-mobile"
                        style={{
                            background: "#0f172a",
                            border:
                                "1px solid #1e293b",
                            borderRadius: 16,
                            padding: 30,
                        }}
                    >

                        <Select
                            label="Topic"
                            value={topic}
                            setValue={setTopic}
                            options={[
                                "Arrays",
                                "Strings",
                                "Linked List",
                                "Trees",
                                "Graphs",
                                "Dynamic Programming",
                            ]}
                        />


                        <Select
                            label="Difficulty"
                            value={difficulty}
                            setValue={
                                setDifficulty
                            }
                            options={[
                                "Easy",
                                "Medium",
                                "Hard",
                            ]}
                        />


                        <Select
                            label="Programming Language"
                            value={language}
                            setValue={setLanguage}
                            options={[
                                "cpp",
                                "python",
                                "javascript",
                            ]}
                        />


                        <button
                            className="interview-button-mobile"
                            onClick={
                                startInterview
                            }
                            disabled={loading}
                            style={{
                                width: "100%",
                                marginTop: 20,
                                padding: 14,
                                border: "none",
                                borderRadius: 9,
                                background:
                                    "#2563eb",
                                color: "white",
                                fontWeight: 700,
                                cursor: "pointer",
                                opacity:
                                    loading
                                        ? 0.6
                                        : 1,
                            }}
                        >
                            {loading
                                ? "Generating Question..."
                                : "Start Interview →"}
                        </button>

                    </div>


                    {/* =================================================
                        INFO
                    ================================================= */}

                    <div
                        className="interview-info-mobile"
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(3,1fr)",
                            gap: 12,
                            marginTop: 20,
                        }}
                    >

                        <Info
                            icon="✦"
                            title="AI Generated"
                            text="Unique coding questions."
                        />

                        <Info
                            icon="⚡"
                            title="Instant Evaluation"
                            text="Detailed AI feedback."
                        />

                        <Info
                            icon="✓"
                            title="Hidden Tests"
                            text="Real coding validation."
                        />

                    </div>

                </main>

            </div>
        </>
    );
}


/* =====================================================
   SELECT COMPONENT
===================================================== */

function Select({
    label,
    value,
    setValue,
    options,
}) {
    return (
        <div
            className="interview-select-group-mobile"
            style={{
                marginBottom: 20,
            }}
        >

            <label
                className="interview-select-label-mobile"
                style={{
                    display: "block",
                    color: "#cbd5e1",
                    fontSize: 13,
                    marginBottom: 8,
                }}
            >
                {label}
            </label>


            <select
                className="interview-select-mobile"
                value={value}
                onChange={(e) =>
                    setValue(
                        e.target.value
                    )
                }
                style={{
                    width: "100%",
                    padding: 12,
                    background: "#020617",
                    color: "white",
                    border:
                        "1px solid #334155",
                    borderRadius: 8,
                    outline: "none",
                }}
            >

                {options.map(
                    (option) => (
                        <option
                            key={option}
                            value={option}
                        >
                            {option}
                        </option>
                    )
                )}

            </select>

        </div>
    );
}


/* =====================================================
   INFO COMPONENT
===================================================== */

function Info({
    icon,
    title,
    text,
}) {
    return (
        <div
            className="interview-info-card-mobile"
            style={{
                background: "#0f172a",
                border:
                    "1px solid #1e293b",
                borderRadius: 10,
                padding: 17,
            }}
        >

            <div
                className="interview-info-icon-mobile"
                style={{
                    color: "#60a5fa",
                    fontSize: 20,
                }}
            >
                {icon}
            </div>


            <strong
                className="interview-info-title-mobile"
                style={{
                    display: "block",
                    marginTop: 8,
                    fontSize: 13,
                }}
            >
                {title}
            </strong>


            <span
                className="interview-info-text-mobile"
                style={{
                    display: "block",
                    color: "#64748b",
                    fontSize: 11,
                    marginTop: 5,
                }}
            >
                {text}
            </span>

        </div>
    );
}


export default Interview;