import express from "express";

import {
    getInterview,
    startInterview,
    submitInterviewCode,
    getInterviewResult,
    getInterviewHistory,
} from "../controllers/interview.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
    "/start",
    authMiddleware,
    startInterview
);

router.post(
    "/:id/submit",
    authMiddleware,
    submitInterviewCode
);

router.get(
    "/:id/result",
    authMiddleware,
    getInterviewResult
);

router.get(
    "/history",
    authMiddleware,
    (req, res, next) => {
        next();
    },
    getInterviewHistory
);

router.get(
    "/:id",
    authMiddleware,
    getInterview
);

export default router;