const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../db/index');
const { JWT_SECRET } = require('../config');
const { userSignupAuth, userSigninAuth } = require('../middleware/user');

const router = express.Router();

// signup route
router.post("/signup", userSignupAuth, async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        newUser.password_hash = await newUser.generateHash(req.body.password);
        await newUser.save();
        
        const userId = newUser._id;
        const token = jwt.sign({ userId: userId }, JWT_SECRET);

        res.status(200).json({ 
            message: "User created successfully",
            token: token
         });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// signin route
router.post("/signin", userSigninAuth, async (req, res) => {
    try{
        const token = jwt.sign({ userId: req.user._id }, JWT_SECRET);

        res.status(200).json({
            message: "User signed in successfully",
            token: token
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// export
module.exports = router;