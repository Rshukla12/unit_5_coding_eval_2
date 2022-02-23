const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const connect = require("./config/db.config");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("hello!");
});


const start = async () => {
    await connect();
    app.listen( PORT, () => {
        console.log("Listening on PORT: ", PORT);
    });
};

module.exports = start;