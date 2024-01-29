const { Router } = require('express');
const userRouter = require('./user');
const accountRouter = require('./account');

const router = Router();

// routes
router.use("/user", userRouter)
router.use("/account", accountRouter)

// export
module.exports = router;