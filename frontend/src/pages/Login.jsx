import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const response = await api.post(
                "/auth/login",
                form
            );

            if (!response.data.success) {
                throw new Error(
                    response.data.message ||
                    "Login failed"
                );
            }

            const token =
                response.data.data?.token ||
                response.data.token;

            if (!token) {
                throw new Error(
                    "Authentication token was not received."
                );
            }

            localStorage.setItem(
                "token",
                token
            );

            navigate("/dashboard");

        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to login"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>
                {`

                /* =====================================================
                   RESPONSIVE CSS
                   DESKTOP / LAPTOP DESIGN IS UNCHANGED
                ===================================================== */


                /* =====================================================
                   TABLET
                   <= 900px
                ===================================================== */

                @media (max-width: 900px) {

                    .login-responsive-page {
                        overflow-x: hidden !important;
                    }


                    /* LEFT SECTION */

                    .login-responsive-page > section:first-of-type {

                        width: 50% !important;

                        padding:
                            50px 5% !important;
                    }


                    /* RIGHT SECTION */

                    .login-responsive-page > section:last-of-type {

                        width: 50% !important;

                        padding: 24px !important;
                    }


                    /* HEADING */

                    .login-responsive-page h1 {

                        font-size:
                            clamp(36px, 5vw, 52px) !important;
                    }


                    /* FEATURES */

                    .login-responsive-page > section:first-of-type
                    > div:nth-child(2)
                    > div:nth-child(2) {

                        grid-template-columns:
                            1fr !important;
                    }
                }



                /* =====================================================
                   MOBILE
                   <= 700px
                ===================================================== */

                @media (max-width: 700px) {

                    /* MAIN */

                    .login-responsive-page {

                        min-height: 100vh !important;

                        display: block !important;

                        overflow-x: hidden !important;

                        overflow-y: auto !important;
                    }


                    /* =================================================
                       LEFT SECTION
                    ================================================= */

                    .login-responsive-page > section:first-of-type {

                        width: 100% !important;

                        min-height: auto !important;

                        padding:
                            80px 20px 35px !important;

                        border-right:
                            none !important;

                        border-bottom:
                            1px solid #1e293b !important;

                        display: block !important;
                    }


                    /* Hide desktop logo */

                    .login-responsive-page > section:first-of-type
                    > div:first-child {

                        display: none !important;
                    }


                    /* Content */

                    .login-responsive-page > section:first-of-type
                    > div:nth-child(2) {

                        max-width:
                            100% !important;

                        width:
                            100% !important;
                    }


                    /* Badge */

                    .login-responsive-page > section:first-of-type
                    > div:nth-child(2)
                    > div:first-child {

                        margin-bottom:
                            18px !important;
                    }


                    /* Main heading */

                    .login-responsive-page h1 {

                        font-size:
                            clamp(34px, 10vw, 48px) !important;

                        line-height:
                            1.08 !important;

                        letter-spacing:
                            -1.5px !important;
                    }


                    /* Description */

                    .login-responsive-page h1 + p {

                        font-size:
                            14px !important;

                        line-height:
                            1.7 !important;

                        margin-top:
                            18px !important;

                        max-width:
                            100% !important;
                    }


                    /* =================================================
                       FEATURES
                    ================================================= */

                    .login-responsive-page > section:first-of-type
                    > div:nth-child(2)
                    > div:nth-child(2) {

                        width:
                            100% !important;

                        grid-template-columns:
                            repeat(2, minmax(0, 1fr)) !important;

                        gap:
                            9px !important;

                        margin-top:
                            25px !important;
                    }


                    /* Feature cards */

                    .login-responsive-page > section:first-of-type
                    > div:nth-child(2)
                    > div:nth-child(2) > div {

                        min-width:
                            0 !important;

                        padding:
                            10px !important;
                    }


                    /* Feature text */

                    .login-responsive-page > section:first-of-type
                    > div:nth-child(2)
                    > div:nth-child(2) span {

                        overflow-wrap:
                            anywhere !important;

                        word-break:
                            break-word !important;
                    }


                    /* Bottom text */

                    .login-responsive-page > section:first-of-type
                    > div:nth-child(2)
                    > div:last-child {

                        margin-top:
                            25px !important;
                    }



                    /* =================================================
                       RIGHT LOGIN SECTION
                    ================================================= */

                    .login-responsive-page > section:last-of-type {

                        width:
                            100% !important;

                        min-height:
                            auto !important;

                        padding:
                            30px 16px 35px !important;

                        display:
                            flex !important;

                        align-items:
                            center !important;

                        justify-content:
                            center !important;
                    }


                    /* Login wrapper */

                    .login-responsive-page > section:last-of-type
                    > div {

                        width:
                            100% !important;

                        max-width:
                            430px !important;
                    }


                    /* Mobile logo */

                    .login-responsive-page > section:last-of-type
                    > div > div:first-child {

                        margin-bottom:
                            18px !important;
                    }


                    /* Login card */

                    .login-responsive-page > section:last-of-type
                    > div > div:nth-child(2) {

                        width:
                            100% !important;

                        padding:
                            24px 20px !important;

                        border-radius:
                            15px !important;
                    }


                    /* Login heading */

                    .login-responsive-page h2 {

                        font-size:
                            24px !important;
                    }


                    /* Login description */

                    .login-responsive-page h2 + p {

                        font-size:
                            12px !important;
                    }


                    /* =================================================
                       INPUT
                    ================================================= */

                    .login-responsive-page input {

                        font-size:
                            13px !important;

                        min-width:
                            0 !important;

                        max-width:
                            100% !important;
                    }


                    /* =================================================
                       BUTTON
                    ================================================= */

                    .login-responsive-page button[type="submit"] {

                        min-height:
                            44px !important;

                        padding:
                            12px !important;
                    }
                }



                /* =====================================================
                   SMALL MOBILE
                   <= 480px
                ===================================================== */

                @media (max-width: 480px) {

                    /* LEFT */

                    .login-responsive-page > section:first-of-type {

                        padding:
                            65px 16px 28px !important;
                    }


                    /* Heading */

                    .login-responsive-page h1 {

                        font-size:
                            34px !important;

                        letter-spacing:
                            -1.2px !important;
                    }


                    /* Features */

                    .login-responsive-page > section:first-of-type
                    > div:nth-child(2)
                    > div:nth-child(2) {

                        grid-template-columns:
                            1fr !important;

                        gap:
                            8px !important;
                    }


                    /* Feature card */

                    .login-responsive-page > section:first-of-type
                    > div:nth-child(2)
                    > div:nth-child(2) > div {

                        padding:
                            10px !important;
                    }


                    /* RIGHT */

                    .login-responsive-page > section:last-of-type {

                        padding:
                            24px 12px 30px !important;
                    }


                    /* CARD */

                    .login-responsive-page > section:last-of-type
                    > div > div:nth-child(2) {

                        padding:
                            22px 17px !important;
                    }


                    /* Heading */

                    .login-responsive-page h2 {

                        font-size:
                            23px !important;
                    }
                }



                /* =====================================================
                   VERY SMALL PHONES
                   <= 360px
                ===================================================== */

                @media (max-width: 360px) {

                    .login-responsive-page > section:first-of-type {

                        padding-left:
                            13px !important;

                        padding-right:
                            13px !important;
                    }


                    .login-responsive-page h1 {

                        font-size:
                            30px !important;
                    }


                    .login-responsive-page > section:last-of-type {

                        padding-left:
                            10px !important;

                        padding-right:
                            10px !important;
                    }


                    .login-responsive-page > section:last-of-type
                    > div > div:nth-child(2) {

                        padding:
                            20px 14px !important;
                    }
                }

                `}
            </style>


            {/* =====================================================
                MAIN CONTAINER
            ===================================================== */}

            <div
                className="login-responsive-page"
                style={{
                    minHeight: "100vh",
                    background: "#020617",
                    color: "#f8fafc",
                    display: "flex",
                    position: "relative",
                    overflow: "hidden",
                }}
            >


                {/* =================================================
                    BACKGROUND GLOW
                ================================================= */}

                <div
                    style={{
                        position: "absolute",
                        width: 500,
                        height: 500,
                        borderRadius: "50%",
                        background:
                            "rgba(37,99,235,.12)",
                        filter: "blur(120px)",
                        top: -220,
                        left: -180,
                        pointerEvents: "none",
                    }}
                />


                <div
                    style={{
                        position: "absolute",
                        width: 450,
                        height: 450,
                        borderRadius: "50%",
                        background:
                            "rgba(99,102,241,.08)",
                        filter: "blur(120px)",
                        bottom: -220,
                        right: -180,
                        pointerEvents: "none",
                    }}
                />


                {/* =================================================
                    LEFT SIDE
                ================================================= */}

                <section
                    style={{
                        width: "55%",
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "60px 7%",
                        position: "relative",
                        borderRight:
                            "1px solid #1e293b",
                    }}
                >

                    {/* Logo */}

                    <div
                        style={{
                            position: "absolute",
                            top: 30,
                            left: "7%",
                            fontSize: 23,
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
                    </div>


                    {/* Content */}

                    <div
                        style={{
                            maxWidth: 600,
                        }}
                    >

                        {/* Badge */}

                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding:
                                    "7px 11px",
                                borderRadius: 20,
                                background:
                                    "rgba(59,130,246,.08)",
                                border:
                                    "1px solid rgba(59,130,246,.2)",
                                color: "#93c5fd",
                                fontSize: 11,
                                fontWeight: 700,
                                marginBottom: 25,
                            }}
                        >

                            <span
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius:
                                        "50%",
                                    background:
                                        "#3b82f6",
                                }}
                            />

                            AI-POWERED INTERVIEWS

                        </div>


                        {/* Heading */}

                        <h1
                            style={{
                                fontSize:
                                    "clamp(40px, 5vw, 68px)",
                                lineHeight: 1.05,
                                letterSpacing:
                                    "-2.5px",
                                margin: 0,
                                fontWeight: 800,
                            }}
                        >
                            Practice
                            <br />

                            <span
                                style={{
                                    color:
                                        "#3b82f6",
                                }}
                            >
                                smarter.
                            </span>

                            <br />

                            Get hired.
                        </h1>


                        {/* Description */}

                        <p
                            style={{
                                maxWidth: 520,
                                color: "#64748b",
                                fontSize: 15,
                                lineHeight: 1.8,
                                marginTop: 25,
                            }}
                        >
                            Prepare for technical
                            interviews with
                            AI-generated coding
                            problems, real code
                            execution, hidden test
                            cases, and intelligent
                            feedback.
                        </p>


                        {/* FEATURES */}

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(2, minmax(0, 1fr))",
                                gap: 12,
                                marginTop: 35,
                                maxWidth: 520,
                            }}
                        >

                            <Feature
                                icon="✦"
                                title="AI Questions"
                                text="Personalized coding challenges"
                            />

                            <Feature
                                icon="⚡"
                                title="Instant Testing"
                                text="Run against hidden tests"
                            />

                            <Feature
                                icon="✓"
                                title="AI Evaluation"
                                text="Detailed code feedback"
                            />

                            <Feature
                                icon="◈"
                                title="Track Progress"
                                text="Improve with every interview"
                            />

                        </div>


                        {/* Bottom */}

                        <div
                            style={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: 12,
                                marginTop: 45,
                                color: "#475569",
                                fontSize: 11,
                            }}
                        >

                            <span
                                style={{
                                    width: 28,
                                    height: 1,
                                    background:
                                        "#334155",
                                }}
                            />

                            Built for developers
                            preparing for real
                            interviews

                        </div>

                    </div>

                </section>



                {/* =================================================
                    RIGHT SIDE
                ================================================= */}

                <section
                    style={{
                        flex: 1,
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 30,
                        position: "relative",
                    }}
                >

                    <div
                        style={{
                            width: "100%",
                            maxWidth: 430,
                        }}
                    >

                        {/* Mobile logo */}

                        <div
                            style={{
                                textAlign:
                                    "center",
                                fontSize: 23,
                                fontWeight: 800,
                                marginBottom: 25,
                            }}
                        >
                            Interview
                            <span
                                style={{
                                    color:
                                        "#3b82f6",
                                }}
                            >
                                AI
                            </span>
                        </div>


                        {/* LOGIN CARD */}

                        <div
                            style={{
                                background:
                                    "rgba(15,23,42,.82)",
                                border:
                                    "1px solid #1e293b",
                                borderRadius: 18,
                                padding: "32px",
                                boxShadow:
                                    "0 30px 100px rgba(0,0,0,.35)",
                                backdropFilter:
                                    "blur(20px)",
                            }}
                        >

                            {/* Icon */}

                            <div
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 12,
                                    background:
                                        "linear-gradient(135deg,#2563eb,#4f46e5)",
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    fontWeight: 900,
                                    fontSize: 15,
                                    boxShadow:
                                        "0 10px 30px rgba(37,99,235,.25)",
                                    marginBottom: 20,
                                }}
                            >
                                AI
                            </div>


                            {/* Heading */}

                            <h2
                                style={{
                                    margin: 0,
                                    fontSize: 27,
                                    letterSpacing:
                                        "-.5px",
                                }}
                            >
                                Welcome back
                            </h2>


                            <p
                                style={{
                                    color:
                                        "#64748b",
                                    fontSize: 13,
                                    lineHeight:
                                        1.6,
                                    marginTop: 9,
                                    marginBottom:
                                        0,
                                }}
                            >
                                Sign in to continue
                                your interview
                                journey.
                            </p>


                            {/* ERROR */}

                            {error && (
                                <div
                                    style={{
                                        display:
                                            "flex",
                                        alignItems:
                                            "flex-start",
                                        gap: 9,
                                        marginTop: 20,
                                        padding: 12,
                                        borderRadius:
                                            9,
                                        background:
                                            "rgba(239,68,68,.08)",
                                        border:
                                            "1px solid rgba(239,68,68,.25)",
                                        color:
                                            "#fca5a5",
                                        fontSize: 12,
                                        lineHeight:
                                            1.5,
                                    }}
                                >

                                    <span>
                                        ⚠
                                    </span>

                                    <span>
                                        {error}
                                    </span>

                                </div>
                            )}


                            {/* FORM */}

                            <form
                                onSubmit={
                                    handleSubmit
                                }
                                style={{
                                    marginTop: 25,
                                }}
                            >

                                {/* EMAIL */}

                                <div
                                    style={{
                                        marginBottom:
                                            18,
                                    }}
                                >

                                    <label
                                        style={
                                            labelStyle
                                        }
                                    >
                                        Email address
                                    </label>


                                    <div
                                        style={
                                            inputWrapper
                                        }
                                    >

                                        <span
                                            style={
                                                inputIcon
                                            }
                                        >
                                            @
                                        </span>


                                        <input
                                            name="email"
                                            type="email"
                                            value={
                                                form.email
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder=
                                                "you@example.com"
                                            required
                                            autoComplete=
                                                "email"
                                            style={
                                                inputStyle
                                            }
                                        />

                                    </div>

                                </div>


                                {/* PASSWORD */}

                                <div
                                    style={{
                                        marginBottom:
                                            8,
                                    }}
                                >

                                    <div
                                        style={{
                                            display:
                                                "flex",
                                            justifyContent:
                                                "space-between",
                                            alignItems:
                                                "center",
                                            marginBottom:
                                                7,
                                        }}
                                    >

                                        <label
                                            style={{
                                                ...labelStyle,
                                                marginBottom:
                                                    0,
                                            }}
                                        >
                                            Password
                                        </label>

                                    </div>


                                    <div
                                        style={
                                            inputWrapper
                                        }
                                    >

                                        <span
                                            style={
                                                inputIcon
                                            }
                                        >
                                            ●
                                        </span>


                                        <input
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={
                                                form.password
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder=
                                                "Enter your password"
                                            required
                                            autoComplete=
                                                "current-password"
                                            style={
                                                inputStyle
                                            }
                                        />


                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            style={{
                                                border:
                                                    "none",
                                                background:
                                                    "transparent",
                                                color:
                                                    "#64748b",
                                                cursor:
                                                    "pointer",
                                                padding:
                                                    "4px",
                                                fontSize:
                                                    11,
                                            }}
                                        >
                                            {showPassword
                                                ? "Hide"
                                                : "Show"}
                                        </button>

                                    </div>

                                </div>


                                {/* LOGIN BUTTON */}

                                <button
                                    type="submit"
                                    disabled={
                                        loading
                                    }
                                    style={{
                                        width: "100%",
                                        border:
                                            "none",
                                        borderRadius:
                                            9,
                                        padding:
                                            13,
                                        marginTop:
                                            22,
                                        background:
                                            loading
                                                ? "#1d4ed8"
                                                : "linear-gradient(135deg,#2563eb,#4f46e5)",
                                        color:
                                            "white",
                                        fontWeight:
                                            700,
                                        fontSize:
                                            13,
                                        cursor:
                                            loading
                                                ? "not-allowed"
                                                : "pointer",
                                        boxShadow:
                                            loading
                                                ? "none"
                                                : "0 10px 25px rgba(37,99,235,.2)",
                                    }}
                                >

                                    {loading ? (

                                        <span
                                            style={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                justifyContent:
                                                    "center",
                                                gap: 8,
                                            }}
                                        >
                                            <span>
                                                ⟳
                                            </span>

                                            Signing in...
                                        </span>

                                    ) : (

                                        <span
                                            style={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                justifyContent:
                                                    "center",
                                                gap: 8,
                                            }}
                                        >
                                            Sign In

                                            <span>
                                                →
                                            </span>
                                        </span>

                                    )}

                                </button>

                            </form>


                            {/* DIVIDER */}

                            <div
                                style={{
                                    display:
                                        "flex",
                                    alignItems:
                                        "center",
                                    gap: 12,
                                    margin:
                                        "25px 0",
                                }}
                            >

                                <div
                                    style={{
                                        height: 1,
                                        flex: 1,
                                        background:
                                            "#1e293b",
                                    }}
                                />

                                <span
                                    style={{
                                        color:
                                            "#475569",
                                        fontSize: 10,
                                    }}
                                >
                                    OR
                                </span>

                                <div
                                    style={{
                                        height: 1,
                                        flex: 1,
                                        background:
                                            "#1e293b",
                                    }}
                                />

                            </div>


                            {/* SIGNUP */}

                            <div
                                style={{
                                    textAlign:
                                        "center",
                                    color:
                                        "#64748b",
                                    fontSize: 12,
                                }}
                            >

                                Don't have an account?

                                <Link
                                    to="/signup"
                                    style={{
                                        color:
                                            "#60a5fa",
                                        textDecoration:
                                            "none",
                                        fontWeight:
                                            700,
                                        marginLeft:
                                            5,
                                    }}
                                >
                                    Create account
                                </Link>

                            </div>

                        </div>


                        {/* SECURITY */}

                        <p
                            style={{
                                textAlign:
                                    "center",
                                color:
                                    "#334155",
                                fontSize: 10,
                                marginTop: 18,
                            }}
                        >
                            Your account and interview
                            data are securely protected.
                        </p>

                    </div>

                </section>

            </div>
        </>
    );
}


/* =====================================================
   FEATURE COMPONENT
===================================================== */

function Feature({
    icon,
    title,
    text,
}) {
    return (
        <div
            style={{
                display: "flex",
                alignItems:
                    "flex-start",
                gap: 11,
                padding: 13,
                border:
                    "1px solid rgba(30,41,59,.7)",
                background:
                    "rgba(15,23,42,.4)",
                borderRadius: 10,
            }}
        >

            <div
                style={{
                    width: 30,
                    height: 30,
                    flexShrink: 0,
                    borderRadius: 7,
                    background:
                        "rgba(59,130,246,.08)",
                    color:
                        "#60a5fa",
                    display: "flex",
                    alignItems:
                        "center",
                    justifyContent:
                        "center",
                    fontSize: 12,
                }}
            >
                {icon}
            </div>


            <div>

                <strong
                    style={{
                        display: "block",
                        fontSize: 11,
                        color: "#cbd5e1",
                    }}
                >
                    {title}
                </strong>


                <span
                    style={{
                        display: "block",
                        color: "#475569",
                        fontSize: 9,
                        marginTop: 4,
                        lineHeight: 1.4,
                    }}
                >
                    {text}
                </span>

            </div>

        </div>
    );
}


/* =====================================================
   STYLES
===================================================== */

const labelStyle = {
    display: "block",
    color: "#cbd5e1",
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 7,
};


const inputWrapper = {
    width: "100%",
    height: 44,
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "0 11px",
    borderRadius: 8,
    border: "1px solid #263449",
    background: "#020617",
};


const inputIcon = {
    color: "#475569",
    fontSize: 12,
    width: 18,
    textAlign: "center",
};


const inputStyle = {
    flex: 1,
    minWidth: 0,
    height: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#f8fafc",
    fontSize: 12,
};


export default Login;