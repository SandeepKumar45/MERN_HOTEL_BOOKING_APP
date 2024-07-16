import { validationResult } from "express-validator";
import { User } from "../models/user.model.js"


export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {

        const existedEmail = await User.findOne({ email: req.body.email })
        if (existedEmail) {
            return res.status(400).json({ message: "User already exists" })
        }

        const user = await User.create(req.body)
        // JWT Token
        const token = await user.generateToken()

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        }

        res.status(200)
            .cookie("refreshToken", token, options)
            .send({ message: "User registered successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" })
    }
}

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // JWT Token
        const token = await user.generateToken()

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        }

        res.status(200)
            .cookie("refreshToken", token, options)
            .json({ userId: user._id })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const validateToken = (req, res) => {
    res.status(200).send({ userId: req.userId });
}

export const logout = (req, res) => {
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    return res.status(200)
        .clearCookie("refreshToken", options)
        .json("Logged Out Successfully")
}

export const getUserDetails = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }

}