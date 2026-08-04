import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signupService = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const { password: _, ...safeUser } = user.toObject();

    return safeUser;
};

export const loginService = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    const { password: _, ...safeUser } = user.toObject();

    return {
        user: safeUser,
        token,
    };
};