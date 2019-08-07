const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var VerseSuggestion = require('./VerseSuggestion')

// @route GET versesuggestion/
// @desc Get all the verse suggestions, sorted by time
// @access PRIVATE
router.get('/', function(req, res) {
    VerseSuggestion.find()
    .sort({ dateCreated : -1 })
    .populate('user')
    .exec(function (err, suggestions) {
        if (err) return res.status(500).send(err);
        res.status(200).send(suggestions)
    })
})




// @route POST versesuggestion/
// @desc put a new suggestion in the database
// @access PRIVATE
router.post('/', function(req, res) {
    VerseSuggestion.create({
        verse: req.body.verse,
        user: req.body.user_id,
        comment : req.body.comment
    }, function (err, suggestion) {
        if (err)  return  res.status(500).send(err)
        res.status(200).send(suggestion)
    })
})

module.exports = router;