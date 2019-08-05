const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const HymnSchema = new Schema({
    displayTitle : {
        type : String,
        required : true,
        unique : false
    },
    firstLine : {
        type : String,
        required : false
    },
    textTitle : {
        type : String,
        required : false
    },
    refrainFirstLine : {
        type : String,
        required : false
    },
    textAuthNumber : {
        type : String, 
        required : true
    },
    languages : {
        type : String, 
        required : false
    },
    authors : {
        type : String,
        required : false
    },
    meter : {
        type : String,
        required: false
    },
    totalInstances : {
        type : Number, 
        required : false
    }
})

mongoose.model('Hymn', HymnSchema);
module.exports = mongoose.model('Hymn');