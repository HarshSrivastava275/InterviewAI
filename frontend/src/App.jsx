import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import InterviewRoom from "./pages/InterviewRoom";
import Result from "./pages/Result";
import History from "./pages/History";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                {/* Protected Routes */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* HISTORY */}
                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <History />
                        </ProtectedRoute>
                    }
                />

                {/* INTERVIEW */}

                <Route
                    path="/interview"
                    element={
                        <ProtectedRoute>
                            <Interview />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/interview/:id"
                    element={
                        <ProtectedRoute>
                            <InterviewRoom />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/interview/:id/result"
                    element={
                        <ProtectedRoute>
                            <Result />
                        </ProtectedRoute>
                    }
                />

                {/* Default */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="*"
                    element={<Login />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;