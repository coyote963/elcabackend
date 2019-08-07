const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Verse = new Schema({
    BibleId : String,
    BookId : String,
    ChapterId : String,
    VerseId : String
})

const VerseSuggestion = new Schema({
    verse : Verse,
    user : { type : Schema.Types.ObjectId, ref : 'User' },
    comment : String,
    dateCreated : {
        type : Date,
        default : Date.now
    }
    
})

mongoose.model('Versesuggestion', VerseSuggestion);
module.exports = mongoose.model('Versesuggestion');