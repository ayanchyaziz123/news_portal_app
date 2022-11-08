const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true,
    },
    name:{
        type: String
    },
    qty:{
        type: Number
    },
    price: {
        type: Number
    },
    image:{
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('orderItem', orderItemSchema);