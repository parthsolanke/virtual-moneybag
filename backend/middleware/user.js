const zod = require('zod');
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
        // validate req body
        const { success } = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ message: "Incorrect inputs" });
        }

        // check if user exists
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
        // validate req body
        const { success } = signinBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ message: "Incorrect inputs" });
        }

        // check if user exists
        const userExists = await User.findOne({ username: req.body.username });
        if (!userExists) {
            return res.status(411).json({ message: "Email not found" });
        }

        req.user = userExists;
        next();
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    userSignupAuth,
    userSigninAuth
};