const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {type: String},
    genre: {type: String},
    content: {type: Array}
    
},
{timestamp: true});

module.exports = mongoose.model('List', userSchema);