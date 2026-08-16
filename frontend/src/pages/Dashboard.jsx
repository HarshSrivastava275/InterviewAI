import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInterviewHistory } from "../services/interview.service";

function Dashboard() {
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(true);

    const startInterview = () => {
        navigate("/interview");
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getInterviewHistory();

                setHistory(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error(" Dashboard History Error:", error);
                setHistory([]);
            } finally {
                setHistoryLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <>
            <style>
                {`
                /* =====================================================
                   RESPONSIVE STYLES
                   DESKTOP / LAPTOP DESIGN REMAINS UNCHANGED
                ===================================================== */

                @media (max-width: 900px) {

                    .dashboard-responsive {
                        overflow-x: hidden !important;
                    }

                    .dashboard-main {
                        width: 92% !important;
                    }

                    /* Hero */

                    .dashboard-hero {
                        gap: 20px !important;
                    }

                    .dashboard-hero h1 {
                        font-size: 36px !important;
                    }

                    .dashboard-hero-description {
                        max-width: 500px !important;
                    }

                    .dashboard-hero-visual {
                        width: 240px !important;
                        height: 240px !important;
                        flex-shrink: 0 !important;
                    }

                    .dashboard-hero-visual-inner {
                        width: 125px !important;
                        height: 125px !important;
                        font-size: 36px !important;
                    }

                    /* Stats */

                    .dashboard-stats {
                        grid-template-columns:
                            repeat(2, minmax(0, 1fr)) !important;
                    }

                    /* Features */

                    .dashboard-features {
                        grid-template-columns:
                            repeat(2, minmax(0, 1fr)) !important;
                    }

                    .dashboard-feature:last-child {
                        grid-column: span 2;
                    }
                }


                /* =====================================================
                   MOBILE
                ===================================================== */

                @media (max-width: 700px) {

                    .dashboard-responsive {
                        width: 100% !important;
                        min-height: 100vh !important;
                        overflow-x: hidden !important;
                    }


                    /* =================================================
                       NAVBAR
                    ================================================= */

                    .dashboard-navbar {
                        height: auto !important;
                        min-height: 64px !important;
                        padding: 12px 5% !important;
                        gap: 10px !important;
                    }

                    .dashboard-logo {
                        font-size: 20px !important;
                    }

                    .dashboard-nav-actions {
                        gap: 8px !important;
                    }

                    .dashboard-new-interview-btn {
                        padding: 9px 11px !important;
                        font-size: 11px !important;
                    }

                    .dashboard-user-btn {
                        width: 36px !important;
                        height: 36px !important;
                        flex-shrink: 0 !important;
                    }


                    /* =================================================
                       MAIN
                    ================================================= */

                    .dashboard-main {
                        width: 90% !important;
                        max-width: none !important;
                        padding: 35px 0 55px !important;
                    }


                    /* =================================================
                       HERO
                    ================================================= */

                    .dashboard-hero {
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        justify-content: flex-start !important;
                        gap: 15px !important;
                        margin-bottom: 30px !important;
                    }

                    .dashboard-hero-content {
                        width: 100% !important;
                    }

                    .dashboard-hero-label {
                        font-size: 10px !important;
                        letter-spacing: 1.5px !important;
                    }

                    .dashboard-hero h1 {
                        font-size:
                            clamp(34px, 11vw, 44px) !important;
                        line-height: 1.08 !important;
                        margin: 0 !important;
                    }

                    .dashboard-hero-description {
                        width: 100% !important;
                        max-width: none !important;
                        font-size: 14px !important;
                        line-height: 1.7 !important;
                        margin-top: 14px !important;
                    }

                    /* AI visual */

                    .dashboard-hero-visual {
                        width: 180px !important;
                        height: 180px !important;
                        align-self: center !important;
                        margin-top: 5px !important;
                    }

                    .dashboard-hero-visual-inner {
                        width: 105px !important;
                        height: 105px !important;
                        border-radius: 24px !important;
                        font-size: 30px !important;
                    }


                    /* =================================================
                       START INTERVIEW
                    ================================================= */

                    .dashboard-start-card {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        padding: 22px !important;
                        gap: 18px !important;
                        margin-bottom: 22px !important;
                    }

                    .dashboard-start-card h2 {
                        font-size: 20px !important;
                    }

                    .dashboard-start-card p {
                        font-size: 13px !important;
                        line-height: 1.6 !important;
                    }

                    .dashboard-start-button {
                        width: 100% !important;
                        padding: 13px 18px !important;
                    }


                    /* =================================================
                       STATS
                    ================================================= */

                    .dashboard-stats {
                        grid-template-columns:
                            repeat(2, minmax(0, 1fr)) !important;
                        gap: 10px !important;
                        margin-bottom: 32px !important;
                    }

                    .dashboard-stat-card {
                        padding: 15px !important;
                        gap: 10px !important;
                        min-width: 0 !important;
                    }

                    .dashboard-stat-icon {
                        width: 36px !important;
                        height: 36px !important;
                        font-size: 15px !important;
                        flex-shrink: 0 !important;
                    }

                    .dashboard-stat-title {
                        font-size: 10px !important;
                    }

                    .dashboard-stat-value {
                        font-size: 20px !important;
                    }


                    /* =================================================
                       PLATFORM
                    ================================================= */

                    .dashboard-platform-title {
                        font-size: 22px !important;
                        line-height: 1.3 !important;
                    }


                    /* =================================================
                       FEATURES
                    ================================================= */

                    .dashboard-features {
                        grid-template-columns: 1fr !important;
                        gap: 12px !important;
                        margin-top: 17px !important;
                    }

                    .dashboard-feature {
                        width: 100% !important;
                        padding: 19px !important;
                        box-sizing: border-box !important;
                    }

                    .dashboard-feature:last-child {
                        grid-column: auto !important;
                    }


                    /* =================================================
                       HISTORY
                    ================================================= */

                    .dashboard-history {
                        margin-top: 38px !important;
                    }

                    .dashboard-history-title {
                        font-size: 22px !important;
                    }

                    .dashboard-empty {
                        padding: 35px 16px !important;
                    }

                    .dashboard-empty h3 {
                        font-size: 17px !important;
                    }

                    .dashboard-empty p {
                        font-size: 13px !important;
                        line-height: 1.6 !important;
                    }
                }


                /* =====================================================
                   SMALL MOBILE
                ===================================================== */

                @media (max-width: 480px) {

                    .dashboard-navbar {
                        padding: 11px 4% !important;
                    }

                    .dashboard-logo {
                        font-size: 19px !important;
                    }

                    .dashboard-new-interview-btn {
                        font-size: 0 !important;
                        width: 38px !important;
                        height: 38px !important;
                        padding: 0 !important;
                        border-radius: 9px !important;

                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                    }

                    .dashboard-new-interview-btn::before {
                        content: "+" !important;
                        font-size: 20px !important;
                        font-weight: 700 !important;
                    }

                    .dashboard-main {
                        width: 92% !important;
                        padding-top: 30px !important;
                    }

                    .dashboard-hero h1 {
                        font-size: 34px !important;
                        line-height: 1.08 !important;
                    }

                    .dashboard-hero-description {
                        font-size: 13px !important;
                    }

                    .dashboard-hero-visual {
                        width: 150px !important;
                        height: 150px !important;
                    }

                    .dashboard-hero-visual-inner {
                        width: 88px !important;
                        height: 88px !important;
                        font-size: 27px !important;
                        border-radius: 20px !important;
                    }

                    .dashboard-start-card {
                        padding: 19px !important;
                        border-radius: 13px !important;
                    }

                    .dashboard-start-card h2 {
                        font-size: 18px !important;
                    }

                    .dashboard-stats {
                        gap: 8px !important;
                    }

                    .dashboard-stat-card {
                        padding: 13px !important;
                        border-radius: 10px !important;
                        display: block !important;
                    }

                    .dashboard-stat-icon {
                        margin-bottom: 9px !important;
                    }

                    .dashboard-stat-value {
                        font-size: 20px !important;
                    }

                    .dashboard-platform-title {
                        font-size: 21px !important;
                    }

                    .dashboard-feature {
                        padding: 18px !important;
                        border-radius: 12px !important;
                    }

                    .dashboard-empty {
                        padding: 30px 14px !important;
                    }
                }


                /* =====================================================
                   VERY SMALL PHONES
                ===================================================== */

                @media (max-width: 360px) {

                    .dashboard-logo {
                        font-size: 18px !important;
                    }

                    .dashboard-user-btn {
                        width: 34px !important;
                        height: 34px !important;
                    }

                    .dashboard-main {
                        width: 94% !important;
                    }

                    .dashboard-hero h1 {
                        font-size: 31px !important;
                    }

                    .dashboard-hero-description {
                        font-size: 12px !important;
                    }

                    .dashboard-hero-visual {
                        width: 135px !important;
                        height: 135px !important;
                    }

                    .dashboard-hero-visual-inner {
                        width: 78px !important;
                        height: 78px !important;
                        font-size: 24px !important;
                    }

                    .dashboard-stat-card {
                        padding: 11px !important;
                    }

                    .dashboard-stat-title {
                        font-size: 9px !important;
                    }

                    .dashboard-stat-value {
                        font-size: 18px !important;
                    }
                }
                `}
            </style>


            {/* =====================================================
                MAIN CONTAINER
            ===================================================== */}

            <div
                className="dashboard-responsive"
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
                    className="dashboard-navbar"
                    style={{
                        height: "70px",
                        borderBottom:
                            "1px solid #1e293b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                            "space-between",
                        padding: "0 5%",
                        background:
                            "rgba(2,6,23,.92)",
                    }}
                >

                    {/* LOGO */}

                    <div
                        className="dashboard-logo"
                        style={{
                            fontSize: "23px",
                            fontWeight: "800",
                            cursor: "pointer",
                        }}
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        Interview
                        <span
                            style={{
                                color: "#3b82f6",
                            }}
                        >
                            AI
                        </span>
                    </div>


                    {/* NAV ACTIONS */}

                    <div
                        className="dashboard-nav-actions"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            position: "relative",
                        }}
                    >

                        <button
                            className="dashboard-new-interview-btn"
                            onClick={startInterview}
                            style={{
                                border: "none",
                                background:
                                    "#2563eb",
                                color: "white",
                                padding:
                                    "10px 17px",
                                borderRadius: "8px",
                                fontWeight: "700",
                                cursor:
                                    "pointer",
                            }}
                        >
                            + New Interview
                        </button>


                        <button
                            className="dashboard-user-btn"
                            onClick={() =>
                                setShowMenu(
                                    !showMenu
                                )
                            }
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                border:
                                    "1px solid #334155",
                                background:
                                    "#1e293b",
                                color:
                                    "#60a5fa",
                                fontWeight:
                                    "800",
                                cursor:
                                    "pointer",
                            }}
                        >
                            U
                        </button>


                        {/* MENU */}

                        {showMenu && (
                            <div
                                style={{
                                    position: "absolute",
                                    right: 0,
                                    top: "50px",
                                    width: "160px",
                                    background: "#0f172a",
                                    border: "1px solid #334155",
                                    borderRadius: "9px",
                                    padding: "6px",
                                    zIndex: 10,
                                }}
                            >

                                {/* HISTORY */}

                                <button
                                    onClick={() => {
                                        setShowMenu(false);
                                        navigate("/history");
                                    }}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        border: "none",
                                        background: "transparent",
                                        color: "#cbd5e1",
                                        textAlign: "left",
                                        cursor: "pointer",
                                        borderRadius: "6px",
                                    }}
                                >
                                    History
                                </button>


                                {/* LOGOUT */}

                                <button
                                    onClick={logout}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        border: "none",
                                        background: "transparent",
                                        color: "#fca5a5",
                                        textAlign: "left",
                                        cursor: "pointer",
                                        borderRadius: "6px",
                                    }}
                                >
                                    Logout
                                </button>

                            </div>
                        )}

                    </div>

                </nav>


                {/* =================================================
                    MAIN
                ================================================= */}

                <main
                    className="dashboard-main"
                    style={{
                        width: "90%",
                        maxWidth: "1180px",
                        margin: "auto",
                        padding:
                            "50px 0 80px",
                    }}
                >


                    {/* =================================================
                        HERO
                    ================================================= */}

                    <section
                        className="dashboard-hero"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent:
                                "space-between",
                            gap: "30px",
                            marginBottom:
                                "40px",
                        }}
                    >

                        <div
                            className="dashboard-hero-content"
                        >

                            <p
                                className="dashboard-hero-label"
                                style={{
                                    margin:
                                        "0 0 10px",
                                    color:
                                        "#60a5fa",
                                    fontSize:
                                        "11px",
                                    fontWeight:
                                        "800",
                                    letterSpacing:
                                        "2px",
                                }}
                            >
                                AI INTERVIEW PLATFORM
                            </p>


                            <h1
                                style={{
                                    margin: 0,
                                    fontSize:
                                        "40px",
                                    lineHeight:
                                        "1.2",
                                }}
                            >
                                Practice.
                                <br />
                                Improve.
                                <br />
                                Get Hired.
                            </h1>


                            <p
                                className="dashboard-hero-description"
                                style={{
                                    color:
                                        "#64748b",
                                    maxWidth:
                                        "560px",
                                    lineHeight:
                                        "1.7",
                                    fontSize:
                                        "15px",
                                    marginTop:
                                        "18px",
                                }}
                            >
                                Prepare for real
                                coding interviews
                                with AI-generated
                                problems, hidden
                                test cases, and
                                detailed feedback
                                on your solutions.
                            </p>

                        </div>


                        {/* AI VISUAL */}

                        <div
                            className="dashboard-hero-visual"
                            style={{
                                width: "300px",
                                height: "300px",
                                borderRadius:
                                    "50%",
                                background:
                                    "radial-gradient(circle, rgba(37,99,235,.25), rgba(2,6,23,0) 70%)",
                                display: "flex",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                            }}
                        >

                            <div
                                className="dashboard-hero-visual-inner"
                                style={{
                                    width:
                                        "150px",
                                    height:
                                        "150px",
                                    borderRadius:
                                        "30px",
                                    background:
                                        "#0f172a",
                                    border:
                                        "1px solid #1e3a8a",
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    fontSize:
                                        "42px",
                                    fontWeight:
                                        "900",
                                    color:
                                        "#3b82f6",
                                    boxShadow:
                                        "0 0 80px rgba(37,99,235,.25)",
                                }}
                            >
                                AI
                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        START INTERVIEW CARD
                    ================================================= */}

                    <section
                        className="dashboard-start-card"
                        style={{
                            background:
                                "linear-gradient(135deg,#0f172a,#111827)",
                            border:
                                "1px solid #1e293b",
                            borderRadius:
                                "16px",
                            padding: "30px",
                            marginBottom:
                                "25px",
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems:
                                "center",
                            gap: "20px",
                        }}
                    >

                        <div>

                            <div
                                style={{
                                    color:
                                        "#60a5fa",
                                    fontSize:
                                        "12px",
                                    fontWeight:
                                        "700",
                                    marginBottom:
                                        "7px",
                                }}
                            >
                                READY?
                            </div>


                            <h2
                                style={{
                                    margin: 0,
                                    fontSize:
                                        "23px",
                                }}
                            >
                                Start a new interview
                            </h2>


                            <p
                                style={{
                                    color:
                                        "#64748b",
                                    marginBottom:
                                        0,
                                }}
                            >
                                Select your topic,
                                difficulty and
                                language.
                            </p>

                        </div>


                        <button
                            className="dashboard-start-button"
                            onClick={
                                startInterview
                            }
                            style={{
                                border: "none",
                                background:
                                    "#2563eb",
                                color: "white",
                                padding:
                                    "13px 22px",
                                borderRadius:
                                    "9px",
                                fontWeight:
                                    "700",
                                cursor:
                                    "pointer",
                                whiteSpace:
                                    "nowrap",
                            }}
                        >
                            Start Interview →
                        </button>

                    </section>


                    {/* =================================================
                        STAT CARDS
                    ================================================= */}

                    <section
                        className="dashboard-stats"
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(4,1fr)",
                            gap: "14px",
                            marginBottom:
                                "40px",
                        }}
                    >

                        <StatCard
                            icon="⌘"
                            title="Interviews"
                            value={history.length}
                        />

                        <StatCard
                            icon="✓"
                            title="Completed"
                            value={
                                history.filter(
                                    (interview) =>
                                        interview.status === "completed"
                                ).length
                            }
                        />

                        <StatCard
                            icon="★"
                            title="Average Score"
                            value={
                                history.length > 0
                                    ? `${Math.round(
                                          history.reduce(
                                              (total, interview) =>
                                                  total + (interview.score || 0),
                                              0
                                          ) / history.length
                                      )}%`
                                    : "—"
                            }
                        />

                        <StatCard
                            icon="⚡"
                            title="Problems Solved"
                            value={
                                history.filter(
                                    (interview) =>
                                        interview.status === "completed"
                                ).length
                            }
                        />

                    </section>


                    {/* =================================================
                        FEATURES
                    ================================================= */}

                    <section>

                        <p
                            style={{
                                color:
                                    "#60a5fa",
                                fontSize:
                                    "11px",
                                fontWeight:
                                    "800",
                                letterSpacing:
                                    "2px",
                                marginBottom:
                                    "8px",
                            }}
                        >
                            PLATFORM
                        </p>


                        <h2
                            className="dashboard-platform-title"
                            style={{
                                margin: 0,
                                fontSize:
                                    "24px",
                            }}
                        >
                            Everything you need to
                            prepare
                        </h2>


                        <div
                            className="dashboard-features"
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(3,1fr)",
                                gap: "15px",
                                marginTop:
                                    "20px",
                            }}
                        >

                            <FeatureCard
                                icon="✦"
                                title="AI Generated Questions"
                                text="Practice with coding problems generated according to your selected topic and difficulty."
                            />

                            <FeatureCard
                                icon="⚡"
                                title="Real Code Execution"
                                text="Your solution runs against hidden test cases before you receive your final score."
                            />

                            <FeatureCard
                                icon="◈"
                                title="AI Code Review"
                                text="Understand your strengths, weaknesses, complexity and areas to improve."
                            />

                        </div>

                    </section>


                    {/* =================================================
                        RECENT INTERVIEWS
                    ================================================= */}

                    <section
                        className="dashboard-history"
                        style={{
                            marginTop:
                                "45px",
                        }}
                    >

                        <p
                            style={{
                                color:
                                    "#60a5fa",
                                fontSize:
                                    "11px",
                                fontWeight:
                                    "800",
                                letterSpacing:
                                    "2px",
                            }}
                        >
                            HISTORY
                        </p>


                        <h2
                            className="dashboard-history-title"
                            style={{
                                margin: 0,
                                fontSize:
                                    "24px",
                            }}
                        >
                            Recent Interviews
                        </h2>


                        <div
                            className="dashboard-empty"
                            style={{
                                marginTop:
                                    "18px",
                                background:
                                    "#0f172a",
                                border:
                                    "1px dashed #334155",
                                borderRadius:
                                    "14px",
                                padding:
                                    "45px 20px",
                                textAlign:
                                    "center",
                            }}
                        >

                            {historyLoading ? (
                            <div
                                className="dashboard-empty"
                                style={{
                                    marginTop: "18px",
                                    background: "#0f172a",
                                    border: "1px dashed #334155",
                                    borderRadius: "14px",
                                    padding: "45px 20px",
                                    textAlign: "center",
                                }}
                            >
                                <p style={{ color: "#64748b", margin: 0 }}>
                                    Loading recent interviews...
                                </p>
                            </div>
                        ) : history.length === 0 ? (
                            <div
                                className="dashboard-empty"
                                style={{
                                    marginTop: "18px",
                                    background: "#0f172a",
                                    border: "1px dashed #334155",
                                    borderRadius: "14px",
                                    padding: "45px 20px",
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "32px",
                                        color: "#475569",
                                    }}
                                >
                                    ◌
                                </div>

                                <h3 style={{ marginBottom: "5px" }}>
                                    No interviews yet
                                </h3>

                                <p
                                    style={{
                                        color: "#64748b",
                                        marginTop: 0,
                                    }}
                                >
                                    Complete your first interview and your
                                    results will appear here.
                                </p>

                                <button
                                    onClick={startInterview}
                                    style={{
                                        border: "none",
                                        background: "#1e293b",
                                        color: "#60a5fa",
                                        padding: "10px 16px",
                                        borderRadius: "8px",
                                        fontWeight: "700",
                                        cursor: "pointer",
                                    }}
                                >
                                    Start First Interview
                                </button>
                            </div>
                        ) : (
                            <div
                                style={{
                                    marginTop: "18px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                }}
                            >
                                {history.slice(0, 5).map((interview) => (
                                    <div
                                        key={interview.interviewId}
                                        style={{
                                            background: "#0f172a",
                                            border: "1px solid #1e293b",
                                            borderRadius: "12px",
                                            padding: "16px 18px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: "15px",
                                        }}
                                    >
                                        <div style={{ minWidth: 0 }}>
                                            <h3
                                                style={{
                                                    margin: 0,
                                                    fontSize: "15px",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {interview.title ||
                                                    "Coding Interview"}
                                            </h3>

                                            <p
                                                style={{
                                                    margin: "6px 0 0",
                                                    color: "#64748b",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                {interview.topic || "-"} ·{" "}
                                                {interview.difficulty || "-"} ·{" "}
                                                {interview.language || "-"}
                                            </p>
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "12px",
                                                flexShrink: 0,
                                            }}
                                        >
                                            <div style={{ textAlign: "right" }}>
                                                <strong style={{ fontSize: "16px" }}>
                                                    {interview.score ?? 0}%
                                                </strong>

                                                <div
                                                    style={{
                                                        color:
                                                            interview.status ===
                                                            "completed"
                                                                ? "#22c55e"
                                                                : "#f59e0b",
                                                        fontSize: "10px",
                                                        marginTop: "2px",
                                                    }}
                                                >
                                                    {interview.status ===
                                                    "completed"
                                                        ? "Completed"
                                                        : "In Progress"}
                                                </div>
                                            </div>

                                            {interview.status === "completed" && (
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/interview/${interview.interviewId}/result`
                                                        )
                                                    }
                                                    style={{
                                                        border: "none",
                                                        background: "#1e293b",
                                                        color: "#60a5fa",
                                                        padding: "8px 11px",
                                                        borderRadius: "7px",
                                                        fontSize: "11px",
                                                        fontWeight: "700",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    View
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={() => navigate("/history")}
                                    style={{
                                        alignSelf: "center",
                                        marginTop: "5px",
                                        border: "none",
                                        background: "transparent",
                                        color: "#60a5fa",
                                        fontSize: "12px",
                                        fontWeight: "700",
                                        cursor: "pointer",
                                    }}
                                >
                                    View All History →
                                </button>
                            </div>
                        )}


                            <h3
                                style={{
                                    marginBottom:
                                        "5px",
                                }}
                            >
                                No interviews yet
                            </h3>


                            <p
                                style={{
                                    color:
                                        "#64748b",
                                    marginTop:
                                        0,
                                }}
                            >
                                Complete your first
                                interview and your
                                results will appear
                                here.
                            </p>


                            <button
                                onClick={
                                    startInterview
                                }
                                style={{
                                    border: "none",
                                    background:
                                        "#1e293b",
                                    color:
                                        "#60a5fa",
                                    padding:
                                        "10px 16px",
                                    borderRadius:
                                        "8px",
                                    fontWeight:
                                        "700",
                                    cursor:
                                        "pointer",
                                }}
                            >
                                Start First Interview
                            </button>

                        </div>

                    </section>

                </main>

            </div>
        </>
    );
}


 
   // STAT CARD
 

function StatCard({
    icon,
    title,
    value,
}) {
    return (
        <div
            className="dashboard-stat-card"
            style={{
                background: "#0f172a",
                border:
                    "1px solid #1e293b",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
            }}
        >

            <div
                className="dashboard-stat-icon"
                style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "9px",
                    background:
                        "rgba(59,130,246,.1)",
                    color: "#60a5fa",
                    display: "flex",
                    alignItems:
                        "center",
                    justifyContent:
                        "center",
                    fontSize: "18px",
                }}
            >
                {icon}
            </div>


            <div>

                <div
                    className="dashboard-stat-title"
                    style={{
                        color: "#64748b",
                        fontSize: "11px",
                    }}
                >
                    {title}
                </div>


                <strong
                    className="dashboard-stat-value"
                    style={{
                        display: "block",
                        fontSize: "23px",
                        marginTop: "3px",
                    }}
                >
                    {value}
                </strong>

            </div>

        </div>
    );
}



 //  FEATURE CARD


function FeatureCard({
    icon,
    title,
    text,
}) {
    return (
        <div
            className="dashboard-feature"
            style={{
                background: "#0f172a",
                border:
                    "1px solid #1e293b",
                borderRadius: "13px",
                padding: "22px",
            }}
        >

            <div
                style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background:
                        "rgba(59,130,246,.1)",
                    color: "#60a5fa",
                    display: "flex",
                    alignItems:
                        "center",
                    justifyContent:
                        "center",
                    fontSize: "18px",
                    marginBottom:
                        "15px",
                }}
            >
                {icon}
            </div>


            <h3
                style={{
                    margin:
                        "0 0 8px",
                    fontSize: "15px",
                }}
            >
                {title}
            </h3>


            <p
                style={{
                    margin: 0,
                    color: "#64748b",
                    lineHeight: "1.6",
                    fontSize: "12px",
                }}
            >
                {text}
            </p>

        </div>
    );
}


export default Dashboard;