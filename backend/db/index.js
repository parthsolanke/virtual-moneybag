const mongoose = require('mongoose');

// connect to db
mongoose.connect("mongodb+srv://parthsolanke:" + process.env.MONGO_PW + "@cluster0.u7lcir4.mongodb.net/payment-app")
    .then(() => {
        console.log("Connected to Database");
    })
    .catch(err => {
        console.log("Error connecting to Database", err);
    });

// schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

// model
const User = mongoose.model("User", userSchema);

// export
module.exports = {
    User
};