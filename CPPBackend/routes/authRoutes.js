const express = require("express");
const { register } = require("../controllers/authController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const router = express.Router();
router.post("/register", register);
router.post("/login", async (req, res) => {
    const { phone, password } = req.body;

    try {
        // 1. Find the user by phone number
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        // 2. Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        // 3. Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, phone: user.phone },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const userResponse = {
        id: user._id, // or user.id
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        profession: user.profession,
        createdAt: user.createdAt // For "Member Since"
        // DO NOT include user.password
        };

        res.status(200).json({ message: "Login successful!", token , user: userResponse});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
module.exports = router;
