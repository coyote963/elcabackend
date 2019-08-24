require('dotenv').config();
const express = require('express');
const router = express.Router();
var Chat = require('./Chat')
var passport = require('passport')
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// @route GET chat/
// @desc Gets the latest 100 messages
// @access PRIVATE
router.get('/', passport.authenticate('jwt', {session : false}), function (req, res) {
    Chat.find()
        .sort({dateCreated : -1})
        .limit(10)
        .populate('user')
        .exec(function (err, messages) {
            if (err) return res.status(500).send(err);
            transform_messages = Array.from(messages, function (message) {
                return {
                    first_name : message.user.first_name,
                    last_name : message.user.last_name,
                    message : message.message,
                    dateCreated : message.dateCreated
                }
            })
            .reverse()
            res.status(200).send(transform_messages)
        })
});

// @route POST chat/
// @desc Post a new chat message
// @access PRIVATE
router.post('/', passport.authenticate('jwt', {session : false}), function (req, res) { 
    Chat.create({
        message : req.body.message,
        user : req.body.user,
    }, function (err, chat) {
        if (err) return res.status(500).send(err)
        res.status(200).send(chat)
    })
})

module.exports = router