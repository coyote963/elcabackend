
const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const HymnSuggestion = new Schema({
    hymn : { type : Schema.Types.ObjectId, ref : 'Hymn' },
    user : { type : Schema.Types.ObjectId, ref : 'User' },
    comment : String,
    dateCreated : {
        type : Date,
        default : Date.now
    }
    
})

mongoose.model('Hymnsuggestion', HymnSuggestion);
module.exports = mongoose.model('Hymnsuggestion');