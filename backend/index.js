const express = require('express');
const rootRouter = require('./routes/index');
const cors = require('cors');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

// start server
app.listen(PORT, (err) => {
    if (err) {
        console.log("Error starting server");
    }
    console.log("Server running on Port", PORT);
});