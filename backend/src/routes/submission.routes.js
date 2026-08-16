import express from "express";

import {
    submitCode,
} from "../controllers/submission.controller.js";

const router = express.Router();

router.post(
    "/run",
    submitCode
);

export default router;