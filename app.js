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

// @route GET getUser
// @desc Get the currently logged in user
// @access Private
app.get("/getUser", passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.headers);
    console.log(req.user);
    res.send(req.user);
});


module.exports = app;