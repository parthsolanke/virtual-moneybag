const express = require('express');
const { verifyToken } = require('../middleware/user');
const { Account } = require('../db');
const { accountAuth } = require('../middleware/account');

const router = express.Router();

// get balance route
router.get("/balance", verifyToken, async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });

        res.json({
            balance: account.balance
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// money transfer route
router.post("/transfer", verifyToken, accountAuth, async (req, res) => {
    try {
        const session = await Account.startSession(); // start a session

        session.startTransaction();
        const { amount, to } = req.body;

        const fromAcc = await Account.findOne({
            userId: req.userId
        }).session(session);

        if (fromAcc.balance < amount) {
            await session.abortTransaction();

            return res.status(400).json({
                message: "Not enough balance"
            });
        }

        const toAcc = await Account.findOne({
            userId: to
        }).session(session);

        // txn
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        ).session(session);

        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        ).session(session);

        // commit txn (after commit the txn is done)
        await session.commitTransaction();

        res.status(200).json({
            message: "Transfer successful"
        });

    } catch (err) {
        await session.abortTransaction();

        res.status(400).json({ message: err.message });
    }
});

module.exports = router;