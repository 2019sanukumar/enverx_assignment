const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    content: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Data', blogSchema)