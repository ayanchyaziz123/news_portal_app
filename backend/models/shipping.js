const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },

}, {timestamps: true});

module.exports = mongoose.model('shipping', shippingSchema);