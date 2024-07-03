import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Validator } from '../utils/validator.js';

dotenv.config();

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, phoneAccessToken, username } = req.body;

    // Validate input fields
    const { isInputValid, msg: inputValidationErrorMsg } = Validator.inputValidation({
        firstName,
        lastName,
        email,
        password,
        phoneAccessToken,
        username
    });
    if (!isInputValid) {
        return res.status(400).json({ msg: inputValidationErrorMsg });
    }

    // Check if user with the email already exists
    var { msg, isNewUserEntry } = await Validator.getUser(email, { attempt: "signup" });
    if (!isNewUserEntry) {
        return res.status(400).json({ msg });
    }

    // Decode phone number from phoneAccessToken
    const { phone_number } = jwt.decode(phoneAccessToken);
    var { msg, isNewUserEntry } = await Validator.getUserByPhoneNumber(phone_number, { attempt: "signup" });
    if (!isNewUserEntry) {
        return res.status(400).json({ msg });
    }

    try {
        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password.toString(), 4),
            phone: phone_number,
            username
        });

        await newUser.save();

        const createdUser = await User.findById(newUser._id).select("-password");
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering a user");
        }

        return res.status(201).json({ msg: "Account created Successfully!", user: createdUser });
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server error" });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const { isInputValid, msg: inputValidationMessage } = Validator.inputValidation({ email, password });
    if (!isInputValid) {
        return res.status(400).json({ msg: inputValidationMessage });
    }

    const { userData, msg, isNewUserEntry } = await Validator.getUser(email, { attempt: "logIn" });
    if (isNewUserEntry) {
        return res.status(400).json({ msg });
    }

    const isPasswordValid = bcrypt.compareSync(password.toString(), userData.password.toString());
    if (!isPasswordValid) {
        return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign({ id: userData.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    userData.password = null;

    try {
        return res.status(200).json({
            userData,
            msg: "Login successful",
            accessToken: token,
        });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server error" });
    }
});

const loginUserWithOtp = asyncHandler(async (req, res) => {
    const { phoneAccessToken } = req.body;

    const { isInputValid, msg: inputValidationMessage } = Validator.inputValidation({ phoneAccessToken });
    if (!isInputValid) {
        return res.status(400).json({ msg: inputValidationMessage });
    }

    const { phone_number } = jwt.decode(phoneAccessToken);
    var { msg, isNewUserEntry, userData } = await Validator.getUserByPhoneNumber(phone_number, { attempt: "logIn" });
    if (isNewUserEntry) {
        return res.status(400).json({ msg });
    }

    const token = jwt.sign({ id: userData.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    userData.password = null;

    try {
        return res.status(200).json({
            userData,
            msg: "Login successful",
            accessToken: token,
        });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server error" });
    }
});

export { registerUser, loginUser, loginUserWithOtp };
