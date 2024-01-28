const express = require('express');
const { User } = require('../db/index');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { userSignupAuth, userSigninAuth } = require('../middleware/user');

const router = express.Router();

router.post("/signup", userSignupAuth, async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        const userId = newUser._id;

        // create token
        const token = jwt.sign({ userId }, JWT_SECRET);

        // send token
        res.status(200).json({ 
            message: "User created successfully",
            token: token
         });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

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