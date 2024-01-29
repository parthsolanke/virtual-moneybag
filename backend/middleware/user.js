const zod = require('zod');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { User } = require('../db/index');

// signup body schema
const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

// Signup auth middleware
async function userSignupAuth(req, res, next) {
    try {
        const { success } = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ message: "Incorrect inputs" });
        }

        const userExists = await User.findOne({ username: req.body.username });
        if (userExists) {
            return res.status(411).json({ message: "Email already taken" });
        }

        next();
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// signin body schema
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

// Signin auth middleware
async function userSigninAuth(req, res, next) {
    try {
        const { success } = signinBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ message: "Incorrect inputs" });
        }

        const userExists = await User.findOne({ username: req.body.username });
        if (!userExists) {
            return res.status(411).json({ message: "User not found" });
        } else {
            const validPassword = await userExists.validatePassword(req.body.password);
            if (!validPassword) {
                return res.status(411).json({ message: "Incorrect password" });
            }
        }

        req.user = userExists;
        next();
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// update body schema
const updateBody = zod.object({
    firstName: zod.string(),
    lastName: zod.string().optional()
});

// Update auth middleware
async function userUpdateAuth(req, res, next) {
    try {
        const { success } = updateBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ message: "Incorrect inputs" });
        }

        const userExists = await User.findById(req.userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        next();
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// middleware for jwt verification
function verifyToken(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ message: "Access denied" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            req.userId = decoded.userId;
            next();

        } catch (err) {
            return res.status(403).json({ message: err.message });
        }
}

module.exports = {
    userSignupAuth,
    userSigninAuth,
    userUpdateAuth,
    verifyToken
};