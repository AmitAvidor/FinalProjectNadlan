const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser= require('body-parser')
const mongoContext = require("./db/mongoContext");
const mySqlContext = require("./db/mySqlContext");
const buildingRouter = require("./routers/buildingRouter");
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use("/api/buildings", buildingRouter);
app.use("/api/users", userRouter);
app.use("/app/auth", authRouter);
mongoContext();
mySqlContext.con(()=>{})
module.exports = app;
