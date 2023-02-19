const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    body: {
        required: true,
        type: String
    },
    tags:{
        required: true,
        type: Array
    }
},{
    collection: 'blogs'
})

module.exports = mongoose.model('DB1', dataSchema)