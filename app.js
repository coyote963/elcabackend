var express = require('express');
var app = express();
var db = require('./db');
var passportConfig = require('./auth/PassportConfig')
var auth = require('./auth/AuthController');
const passport = require("passport");
var cors = require('cors');

app.use(passport.initialize());
passportConfig(passport);
app.use(cors());
app.use("/auth", auth);

module.exports = app;