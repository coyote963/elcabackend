const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    message : {
        type : String,
        required : true,
    },
    dateCreated : {
        type : Date,
        default : Date.now
    },
    user : { 
        type :  Schema.Types.ObjectId,
        ref : 'User' 
    }
})

mongoose.model('Chat', ChatSchema);
module.exports = mongoose.model('Chat')