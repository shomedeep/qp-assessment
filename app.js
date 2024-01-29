const express = require("express");
const bodyParser = require("body-parser");

const adminRoute = require("./api/routes/admin");
const userRoute = require("./api/routes/user");
const authRoute = require("./api/routes/auth");

const app = express();

app.use(bodyParser.json());
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);


module.exports = app;
