require('dotenv').config();
const express = require('express');
const router  = express.Router();
const axios = require('axios')
const BIBLE_API_KEY = process.env.BIBLE_API_KEY
var passport = require('passport')
// @route GET bible/
// @desc Get the bibles
// @access Public
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var headers = {"api-key" : BIBLE_API_KEY}
    axios.get("https://api.scripture.api.bible/v1/bibles", {headers : headers })
    .then(api_response => {
        const versions = api_response.data.data
        .filter((bible) => {
            return bible.language.name == "English"
        })
        .map((data) => {
            return {
                name: data.name,
                id: data.id,
                abbreviation: data.abbreviation,
                description: data.description,
            };
        })
        res.send(versions)
        
    })
    .catch(error => {
        console.log(error)
    })
});

// @route GET bible/
// @desc Get the books in this bible
// @access Public
router.get('/:bible', passport.authenticate('jwt', { session: false }), function(req, res) {
    var headers = {"api-key" : BIBLE_API_KEY}
    //console.log("https://api.scripture.api.bible/v1/bibles/" + req.params.bible + "/books")
    axios.get("https://api.scripture.api.bible/v1/bibles/" + req.params.bible + "/books", {headers : headers })
    .then(api_response => {
        const books = api_response.data.data
        res.send(books)
        
    })
    .catch(error => {
        console.log(error)
    })
});

// @route GET bible/
// @desc Get the chapters in this book
// @access Public
router.get('/:bible/:book', passport.authenticate('jwt', { session: false }), function(req, res) {
    var headers = {"api-key" : BIBLE_API_KEY}
    //console.log("https://api.scripture.api.bible/v1/bibles/" + req.params.bible + "/books")
    axios.get("https://api.scripture.api.bible/v1/bibles/" + req.params.bible + "/books/" + req.params.book + "/chapters", {headers : headers })
    .then(api_response => {
        const books = api_response.data.data
        res.send(books)
        
    })
    .catch(error => {
        console.log(error)
    })
});
// @route GET bible/verse/:bible/:chapter
// @desc Get the list of verses in this book
// @access Public
router.get('/verse/:bible/:chapter', passport.authenticate('jwt', { session: false }), function(req, res) {
    var headers = {"api-key" : BIBLE_API_KEY}
    //console.log("https://api.scripture.api.bible/v1/bibles/" + req.params.bible + "/books")
    axios.get("https://api.scripture.api.bible/v1/bibles/" + req.params.bible + "/chapters/" + req.params.chapter + "/verses", {headers : headers })
    .then(api_response => {
        const books = api_response.data.data
        res.send(books)
        
    })
    .catch(error => {
        console.log(error)
    })
});

// @route GET bible/verse/:bible/:chapter
// @desc Get the list of verses in this book
// @access Public
router.get('/versecontent/:bible/:verseid',passport.authenticate('jwt', { session: false }), function(req, res) {
    var headers = {"api-key" : BIBLE_API_KEY}
    //console.log("https://api.scripture.api.bible/v1/bibles/" + req.params.bible + "/books")
    axios.get("https://api.scripture.api.bible/v1/bibles/" + req.params.bible + "/verses/" + req.params.verseid , {headers : headers })
    .then(api_response => {
        const books = api_response.data.data
        res.send(books)
        
    })
    .catch(error => {
        console.log(error)
    })
});

// @route GET bible/verse/:bible/:chapter
// @desc Get the list of verses in this book
// @access Public
router.get('/chaptercontent/:bible/:chapterid', passport.authenticate('jwt', { session: false }), function(req, res) {
    var headers = {"api-key" : BIBLE_API_KEY}
    //console.log("https://api.scripture.api.bible/v1/bibles/" + req.params.bible + "/books")
    axios.get("https://api.scripture.api.bible/v1/bibles/" + req.params.bible + "/chapters/" + req.params.chapterid , {headers : headers })
    .then(api_response => {
        const chapter = api_response.data.data
        res.send(chapter)
        
    })
    .catch(error => {
        console.log(error)
    })
});


// @route 
module.exports = router;