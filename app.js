var express = require('express');
var app = express();
var db = require('./db');
var passportConfig = require('./auth/PassportConfig');
var { allowOnly } = require('./allowOnly');
var auth = require('./auth/AuthController');
var passport = require("passport");
var cors = require('cors');
var bible = require('./bible/BibleController');
var hymn = require('./hymn/HymnController');
var prayer = require('./prayer/PrayerController');
let authenticateroute = require('./AuthMiddleware');
var versesuggestion = require('./verse_suggestion/VerseSuggestionController');
var hymnsuggestion = require('./hymn_suggestion/HymnSuggestionController');
var chat = require('./chat/ChatController')
app.use(passport.initialize());
passportConfig(passport);
app.use(cors());

app.use("/auth", auth);
app.use("/bible", bible);
app.use("/hymn", hymn);
app.use("/versesuggest", authenticateroute, versesuggestion);
app.use("/hymnsuggest", authenticateroute, hymnsuggestion);
app.use("/prayer", authenticateroute, prayer);
app.use('/chat', chat)
// @route GET getUser
// @desc Get the currently logged in user
// @access Private
app.get("/getUser", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user);
});


// @route GET roles
// @desc Get the roles of the user
// @access Private
app.get("/roles", passport.authenticate('jwt', {session: false}), allowOnly('admin', function(req, res) {
    res.send(req.user.roles)
}))

app.get('/', (req, res) => res.send('Welcome to ELCA Church backend'))


module.exports = app;