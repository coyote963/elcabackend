const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : false
    }
})

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');