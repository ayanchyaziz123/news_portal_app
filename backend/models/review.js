const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    rating:{
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('review', reviewSchema);

