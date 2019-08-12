
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PrayerSchema = new Schema({
    user : { type : Schema.Types.ObjectId, ref : 'User' },
    comment : String,
    dateCreated : {
        type : Date,
        default : Date.now
    }
})
mongoose.model('Prayer',  PrayerSchema);
module.exports = mongoose.model('Prayer');