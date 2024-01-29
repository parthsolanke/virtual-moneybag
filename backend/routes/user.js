const zod = require('zod');
const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../db/index');
const { JWT_SECRET } = require('../config');
const { userSignupAuth, userSigninAuth, verifyToken, userUpdateAuth } = require('../middleware/user');

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


// user metadata update route
router.put("/update", verifyToken, userUpdateAuth, async (req, res) => {
    try {
        const isUpdate = await User.updateOne({ _id: req.userId }, { $set: req.body })
        if (isUpdate.modifiedCount === 0) {
            return res.status(411).json({ message: "Error in updating info" });
        }

        res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

const updatePasswordBody = zod.object({
    oldPassword: zod.string(),
    newPassword: zod.string()
});
// update password route
router.put("/update/password", verifyToken, async (req, res) => {
    try {
        const { success } = updatePasswordBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ message: "Incorrect inputs" });
        }

        const userExists = await User.findById(req.userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await userExists.validatePassword(req.body.oldPassword);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect old password" });
        }

        userExists.password_hash = await userExists.generateHash(req.body.newPassword);
        await userExists.save();

        res.status(200).json({ message: "Password updated successfully" });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// get user route
router.get("/bulk", verifyToken, async (req, res) => {
    const filter = req.query.filter || "";
    try {
        const users = await User.find({
            $or: [
                { username: { $regex: filter, $options: "i" } },
                { firstName: { $regex: filter, $options: "i" } },
                { lastName: { $regex: filter, $options: "i" } }
            ]
        })
        
        res.status(200).json({
            users: users.map((user) => {
                return {
                    _id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            })
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// export
module.exports = router;