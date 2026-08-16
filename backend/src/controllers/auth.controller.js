import {
    signupService,
    loginService,
} from "../services/auth.service.js";

export const signup = async (req, res) => {
    try {
        const user = await signupService(req.body);

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const result = await loginService(req.body);

        res.status(200).json({
            success: true,
            message: "Login Successful",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCurrentUser = async (req, res) => {
    return res.status(200).json({
        success: true,
        data: req.user,
    });
};