const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const VerseSuggestion = new Schema({
    bibleId : String,
    bookId : String,
    chapterId : String,
    verseId : String,
    user : { type : Schema.Types.ObjectId, ref : 'User' },
    comment : String,
    dateCreated : {
        type : Date,
        default : Date.now
    }
})

mongoose.model('Versesuggestion', VerseSuggestion);
module.exports = mongoose.model('Versesuggestion');