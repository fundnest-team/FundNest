import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    console.log("Register API hit");
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        };



        const userexist = await User.findOne({ email });
        if (userexist) {
            return res.status(400).json({ message: "user already exist" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashPassword
        });


        res.status(201).json({
            message: "user registered successfully",
            user,
        });
    }

    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export { registerUser, loginUser };
