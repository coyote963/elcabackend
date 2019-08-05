var express = require('express');
var app = express();
var db = require('./db');
var passportConfig = require('./auth/PassportConfig')
var auth = require('./auth/AuthController');
const passport = require("passport");
var cors = require('cors');
var bible = require('./bible/BibleController');
var hymn = require('./hymn/HymnController')
app.use(passport.initialize());
passportConfig(passport);
app.use(cors());
app.use("/auth", auth);
app.use("/bible", bible)
app.use("/hymn", hymn)
// @route GET getUser
// @desc Get the currently logged in user
// @access Private
app.get("/getUser", passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.headers);
    console.log(req.user);
    res.send(req.user);
});

app.get('/', (req, res) => res.send('Welcome to ELCA Church backend'))
module.exports = app;