import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        //check existing user
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User alreaady exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({ message: "Registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credential" });
        }

        //Generate token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Update Profile
export const updateProfile = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const { name, bio } = req.body || {};

    if (name) user.name = name;
    if (bio) user.bio = bio;

    if (req.file) {
        user.avatar = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.json(user);
};

// Get User Details
export const getUser = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
};

// Create User
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            role,
        });

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
