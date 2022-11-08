const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review',
    }],
    image: {
        type: String
    },
    isPublished: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

module.exports = mongoose.model('article', articleSchema);