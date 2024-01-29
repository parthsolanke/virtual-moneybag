const { Account } = require("../db");

// txn Auth middleware
async function accountAuth(req, res, next) {
    try {
        const existsToAcc = await Account.findOne({
            userId: req.body.to
        });

        if (!existsToAcc) {
            return res.status(400).json({ message: "Receiver's account does not exist" });
        }

        const existsFromAcc = await Account.findOne({
            userId: req.userId
        });

        if (!existsFromAcc) {
            return res.status(400).json({ message: "Sender's account does not exist" });
        }

        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    accountAuth
};