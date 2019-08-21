const express = require('express');
const router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var passport = require('passport')

var Prayer = require('./Prayer')

// @route GET prayer/
// @desc Get all the prayers, sorted by time
// @access ADMIN
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    Prayer.find()
    .sort({dateCreated : -1})
    .populate('user')
    .exec(function (err, prayers) {
        if (err) {console.log(err)}
        else {
            res.status(200).send(prayers)
        }
    })
})

// @route POST prayer/
// @desc Post a new prayer
// @access USER
router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    Prayer.create({
        comment : req.body.comment,
        user : req.body.user,
    }, function(err, prayer) {
        if (err) return res.status(500).send(err)
        res.status(200).send(prayer)
    })
})

// @route GET prayer/:userId
// @desc Get prayers from that user and
// @access ADMIN, PRIVATE
router.get('/:userId', passport.authenticate('jwt', { session: false }), function(req, res) {
    if (req.user._id != req.params.userId) {
        return res.sendStatus(403);
    }
    Prayer.find({user : req.params.userId})
    .sort({ dateCreated : -1 })
    .exec(function (err, prayers) {
        if (err) return res.status(500).send(err)
        res.status(200).send(prayers)
    })
})

module.exports = router;