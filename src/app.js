const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");

//middleware
app.use(cookieParser());
app.use(express.json());

//require all routes here
const authRouter = require("./routes/auth.routes")

/* using all the routes here */
app.use("/api/auth",authRouter);

module.exports = app;