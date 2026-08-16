import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import submissionRoutes from "./routes/submission.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(
    "/api/submission",
    submissionRoutes
);

app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});