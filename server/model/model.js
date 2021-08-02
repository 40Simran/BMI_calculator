const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        unique: true
    },
    height : {
        type: String,
        required: true,
     
    },
    weight : {
        type: String,
        required: true,
     
    },
    bmi : {
        type: String,
        required: true,
     
    }
    
})

const Userdb = mongoose.model('userBMI', schema);

module.exports = Userdb;