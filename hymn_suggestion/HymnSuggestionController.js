const express = require('express');
const router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var passport = require('passport')
var HymnSuggestion = require('./HymnSuggestion')
var { allowOnly } = require('../allowOnly')
// @route GET hymnsuggest/
// @desc Get all the hymn suggestions, sorted by time
// @access PRIVATE
router.get('/', passport.authenticate('jwt', { session: false }), allowOnly('admin', function(req, res) {
    HymnSuggestion.find()
    .sort({ dateCreated : -1 })
    .populate('hymn')
    .populate('user')
    .exec(function (err, suggestions) {
        if (err) {console.log(err)}
        else {
            res.status(200).send(suggestions)
        }
    })
}))


// @route POST hymnsuggest/
// @desc put a new suggestion in the database
// @access USER
router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    HymnSuggestion.create({
        hymn: req.body.hymn,
        user: req.body.user,
        comment : req.body.comment
    }, function (err, suggestion) {
        if (err)  return  res.status(500).send(err)
        res.status(200).send(suggestion)
    })
})


// @route GET hymnsuggest/:userId
// @desc Get all the verse suggestions from the user, User Id
// @access PRIVATE, ADMIN
router.get('/:userId', passport.authenticate('jwt', { session: false }), function(req, res) {
    if (String(req.user._id) !== req.params.userId) {
        res.status(403)
    }
    HymnSuggestion.find({user : req.params.userId})
    .sort({dateCreated : -1 })
    .populate('hymn')
    .exec(function (err, suggestions) {
        if (err) return res.status(500).send(err);
        res.status(200).send(suggestions)
    })
})

module.exports = router;