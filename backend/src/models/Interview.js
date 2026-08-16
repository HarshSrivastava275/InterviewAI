import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        topic: {
            type: String,
            required: true,
        },

        difficulty: {
            type: String,
            required: true,
        },

        language: {
            type: String,
            required: true,
        },

        question: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },

        status: {
            type: String,
            enum: [
                "started",
                "in_progress",
                "completed",
            ],
            default: "started",
        },

        score: {
            type: Number,
            default: 0,
        },

        evaluation: {
            correctness_score: {
                type: Number,
                default: 0,
            },

            time_complexity: {
                type: String,
                default: "",
            },

            space_complexity: {
                type: String,
                default: "",
            },

            strengths: {
                type: [String],
                default: [],
            },

            weaknesses: {
                type: [String],
                default: [],
            },

            suggestions: {
                type: [String],
                default: [],
            },
        },
        executionResult: {
            total: {
                type: Number,
                default: 0,
            },

            passed: {
                type: Number,
                default: 0,
            },

            failed: {
                type: Number,
                default: 0,
            },

            results: {
                type: Array,
                default: [],
            },
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "Interview",
    interviewSchema
);