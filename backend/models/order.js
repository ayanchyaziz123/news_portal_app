const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true
    },
    taxPrice:{
        type: Number,
        required: true
    },
    shippingPrice: {
        type: Number
    },
    totalPrice:{
        type: Number
    },
    isPaid:{
        type: Boolean
    },
    paidAt:{

    },
    isDelivered:{
        type: Boolean
    },
    deliveredAt:{
        type: Date
    },
    payment: []
}, {timestamps: true});

module.exports = mongoose.model('order', orderSchema);