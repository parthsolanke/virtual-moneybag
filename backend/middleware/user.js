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

        const userExists = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });
        if (!userExists) {
            return res.status(411).json({ message: "Incorrect inputs" });
        }

        req.user = userExists;
        next();
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// middleware for jwt verification
function verifyToken(req, res, next) {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ message: "Access denied" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            if (decoded.userID) {
                req.userId = decoded.userID;
                next();
            }

            return res.status(403).json({ message: "Access denied" });

        } catch (err) {
            return res.status(403).json({ message: err.message });
        }

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    userSignupAuth,
    userSigninAuth,
    verifyToken
};