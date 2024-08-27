const express = require('express');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const UserModel1 = require('../models/Userdata'); 

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(express.json());
router.use(express.static('public'));

router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
router.use(cookieParser());

router.post("/user-register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await UserModel1.findOne({ email });
        if (existingUser) {
            return res.status(409).json("User already has an account");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel1({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json("Account created successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET route to fetch all registered users (excluding passwords)
router.get("/user-details", async (req, res) => {
    try {
        const users = await UserModel1.find({}, '-password'); // Exclude the password field from the response
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
