const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var VerseSuggestion = require('./VerseSuggestion')
var {allowOnly} = require('../allowOnly')
var passport = require('passport')
// @route GET versesuggestion/
// @desc Get all the verse suggestions, sorted by time
// @access PRIVATE
router.get('/', passport.authenticate('jwt', { session: false }), allowOnly('admin', function(req, res) {
    VerseSuggestion.find()
    .sort({ dateCreated : -1 })
    .populate('user')
    .exec(function (err, suggestions) {
        if (err) return res.status(500).send(err);
        res.status(200).send(suggestions)
    })
}))

// @route GET versesuggestion/:userId
// @desc Get all the verse suggestions from the user, User Id
// @access PRIVATE, ADMIN
router.get('/:userId', passport.authenticate('jwt', { session: false }), function (req, res) {
    if (req.user._id != req.params.userId) {
        return res.sendStatus(403);
    }
    VerseSuggestion.find({ user : req.params.userId })
    .sort({dateCreated : -1 })
    .exec(function (err, suggestions) {
        if (err) return res.status(500).send(err);
        res.status(200).send(suggestions)
    })
})



// @route POST versesuggestion/
// @desc put a new suggestion in the database
// @access PRIVATE
router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    console.log(req.body)
    VerseSuggestion.create({
        bibleAbbr : req.body.bibleAbbr,
        bibleId : req.body.bibleId,
        bookId: req.body.bookId,
        chapterId : req.body.chapterId,
        verseId : req.body.verseId,
        user: req.body.user,
        comment : req.body.comment
    }, function (err, suggestion) {
        if (err)  return  res.status(500).send(err)
        res.status(200).send(suggestion)
    })
})

module.exports = router;