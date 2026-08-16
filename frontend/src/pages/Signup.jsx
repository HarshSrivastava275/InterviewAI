import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
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

        if (form.password.length < 6) {
            setError(
                "Password must be at least 6 characters."
            );
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await api.post(
                "/auth/signup",
                form
            );

            if (!response.data.success) {
                throw new Error(
                    response.data.message ||
                    "Signup failed"
                );
            }

            const token =
                response.data.data?.token ||
                response.data.token;

            if (token) {
                localStorage.setItem(
                    "token",
                    token
                );

                navigate("/dashboard");
            } else {
                navigate("/login");
            }

        } catch (error) {
            console.error(
                "SIGNUP ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to create account"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#020617",
                color: "#f8fafc",
                display: "flex",
                position: "relative",
                overflow: "hidden",
            }}
        >

            {/* BACKGROUND GLOW */}

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
                    right: -180,
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
                    left: -180,
                    pointerEvents: "none",
                }}
            />

            {/* LEFT */}

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

                <div
                    style={{
                        maxWidth: 600,
                    }}
                >

                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "7px 11px",
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
                                borderRadius: "50%",
                                background:
                                    "#3b82f6",
                            }}
                        />

                        START YOUR JOURNEY
                    </div>

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
                        Build
                        <br />

                        <span
                            style={{
                                color: "#3b82f6",
                            }}
                        >
                            confidence.
                        </span>

                        <br />

                        Crack interviews.
                    </h1>

                    <p
                        style={{
                            maxWidth: 520,
                            color: "#64748b",
                            fontSize: 15,
                            lineHeight: 1.8,
                            marginTop: 25,
                        }}
                    >
                        Create your InterviewAI account
                        and start practicing coding
                        interviews with intelligent
                        evaluation and personalized
                        feedback.
                    </p>

                    <div
                        style={{
                            marginTop: 35,
                            display: "flex",
                            flexDirection: "column",
                            gap: 13,
                            maxWidth: 470,
                        }}
                    >

                        <Benefit
                            number="01"
                            title="Choose your challenge"
                            text="Select your topic, difficulty and programming language."
                        />

                        <Benefit
                            number="02"
                            title="Solve real problems"
                            text="Write and execute your solution inside the interview room."
                        />

                        <Benefit
                            number="03"
                            title="Get AI feedback"
                            text="Understand what you did well and what you need to improve."
                        />

                    </div>

                </div>

            </section>


            {/* RIGHT */}

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

                    {/* MOBILE LOGO */}

                    <div
                        style={{
                            textAlign: "center",
                            fontSize: 23,
                            fontWeight: 800,
                            marginBottom: 25,
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


                    {/* CARD */}

                    <div
                        style={{
                            background:
                                "rgba(15,23,42,.82)",
                            border:
                                "1px solid #1e293b",
                            borderRadius: 18,
                            padding: 32,
                            boxShadow:
                                "0 30px 100px rgba(0,0,0,.35)",
                            backdropFilter:
                                "blur(20px)",
                        }}
                    >

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

                        <h2
                            style={{
                                margin: 0,
                                fontSize: 27,
                                letterSpacing:
                                    "-.5px",
                            }}
                        >
                            Create your account
                        </h2>

                        <p
                            style={{
                                color: "#64748b",
                                fontSize: 13,
                                lineHeight: 1.6,
                                marginTop: 9,
                            }}
                        >
                            Start your interview
                            preparation today.
                        </p>


                        {/* ERROR */}

                        {error && (
                            <div
                                style={{
                                    display: "flex",
                                    gap: 9,
                                    marginTop: 18,
                                    padding: 12,
                                    borderRadius: 9,
                                    background:
                                        "rgba(239,68,68,.08)",
                                    border:
                                        "1px solid rgba(239,68,68,.25)",
                                    color: "#fca5a5",
                                    fontSize: 12,
                                    lineHeight: 1.5,
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
                            onSubmit={handleSubmit}
                            style={{
                                marginTop: 22,
                            }}
                        >

                            {/* NAME */}

                            <div
                                style={{
                                    marginBottom: 16,
                                }}
                            >
                                <label
                                    style={
                                        labelStyle
                                    }
                                >
                                    Full name
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
                                        ◆
                                    </span>

                                    <input
                                        name="name"
                                        type="text"
                                        value={
                                            form.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Harsh Srivastava"
                                        required
                                        autoComplete="name"
                                        style={
                                            inputStyle
                                        }
                                    />
                                </div>
                            </div>


                            {/* EMAIL */}

                            <div
                                style={{
                                    marginBottom: 16,
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
                                        placeholder="you@example.com"
                                        required
                                        autoComplete="email"
                                        style={
                                            inputStyle
                                        }
                                    />
                                </div>
                            </div>


                            {/* PASSWORD */}

                            <div>
                                <label
                                    style={
                                        labelStyle
                                    }
                                >
                                    Password
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
                                        placeholder="Minimum 6 characters"
                                        required
                                        autoComplete="new-password"
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
                                            fontSize:
                                                10,
                                        }}
                                    >
                                        {showPassword
                                            ? "Hide"
                                            : "Show"}
                                    </button>
                                </div>
                            </div>


                            {/* PASSWORD HINT */}

                            <div
                                style={{
                                    color: "#475569",
                                    fontSize: 10,
                                    marginTop: 7,
                                }}
                            >
                                Use at least 6 characters
                                for your password.
                            </div>


                            {/* BUTTON */}

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: "100%",
                                    border: "none",
                                    borderRadius: 9,
                                    padding: 13,
                                    marginTop: 22,
                                    background:
                                        "linear-gradient(135deg,#2563eb,#4f46e5)",
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 13,
                                    cursor:
                                        loading
                                            ? "not-allowed"
                                            : "pointer",
                                    opacity:
                                        loading
                                            ? 0.6
                                            : 1,
                                    boxShadow:
                                        "0 10px 25px rgba(37,99,235,.2)",
                                }}
                            >
                                {loading
                                    ? "Creating account..."
                                    : "Create Account →"}
                            </button>

                        </form>


                        {/* LOGIN */}

                        <div
                            style={{
                                textAlign: "center",
                                color: "#64748b",
                                fontSize: 12,
                                marginTop: 25,
                            }}
                        >
                            Already have an account?

                            <Link
                                to="/login"
                                style={{
                                    color:
                                        "#60a5fa",
                                    textDecoration:
                                        "none",
                                    fontWeight: 700,
                                    marginLeft: 5,
                                }}
                            >
                                Sign in
                            </Link>
                        </div>

                    </div>


                    <p
                        style={{
                            textAlign: "center",
                            color: "#334155",
                            fontSize: 10,
                            marginTop: 18,
                        }}
                    >
                        By creating an account, you can
                        start your personalized interview
                        practice.
                    </p>

                </div>

            </section>

        </div>
    );
}


/* ============================================
   BENEFIT
============================================ */

function Benefit({
    number,
    title,
    text,
}) {
    return (
        <div
            style={{
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
            }}
        >
            <div
                style={{
                    width: 34,
                    height: 34,
                    flexShrink: 0,
                    borderRadius: 8,
                    background:
                        "rgba(59,130,246,.08)",
                    border:
                        "1px solid rgba(59,130,246,.15)",
                    color: "#60a5fa",
                    display: "flex",
                    alignItems:
                        "center",
                    justifyContent:
                        "center",
                    fontSize: 10,
                    fontWeight: 800,
                }}
            >
                {number}
            </div>

            <div>
                <strong
                    style={{
                        display: "block",
                        color: "#cbd5e1",
                        fontSize: 12,
                    }}
                >
                    {title}
                </strong>

                <span
                    style={{
                        display: "block",
                        color: "#475569",
                        fontSize: 10,
                        marginTop: 4,
                        lineHeight: 1.5,
                    }}
                >
                    {text}
                </span>
            </div>
        </div>
    );
}


/* ============================================
   STYLES
============================================ */

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
    fontSize: 11,
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

export default Signup;