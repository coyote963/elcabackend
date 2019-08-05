require('dotenv').config();
const express = require('express');
const router  = express.Router();
var Hymn = require('./Hymn')

// @route GET hymn/
// @desc Gets the top 100 hymns by totalInstances field
// @access PUBLIC
router.get('/', function(req, res) {
    Hymn.find()
        .limit(100)
        .sort({totalInstances : -1})
        .exec(function (err, hymns) {
            if (err) return res.status(500).send(err);
            res.status(200).send(hymns)
        })
});

// @route GET /hymn/search/:searchTerm
router.get('/search/:searchTerm', function (req, res) {
    console.log(req.params.searchTerm)
    Hymn.find({$text : {$search : req.params.searchTerm}},
        { score: { $meta : "textScore" }})
        .sort( {score : { $meta : "textScore" }})
        .limit(50)
        .exec(function (err, hymns) {
            if (err) return res.status(500).send(err);
            res.status(200).send(hymns)
        })
})

module.exports = router