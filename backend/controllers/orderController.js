const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Product = require('../models/product');
const Shipping = require('../models/shipping');
const mongoose = require('mongoose');
const shipping = require('../models/shipping');
const product = require('../models/product');
const User = require('../models/user');
const user = require('../models/user');




exports.orderPaid= async (req, res, next) =>{
    console.log("payment ", req.body);
    try{
        const pay = {
            isPaid: true,
            paidAt: Date.now(),
            payment: req.body
        }
        var id = mongoose.Types.ObjectId(req.params.id)
        const filter = { _id: id }
        let updateOrder = await Order.findOneAndUpdate(filter, pay, {
            new: true
        });
        return res.status(200).json({
            order: updateOrder,
            message: "Order was paid"
        })
    }
    catch(error)
    {
        return res.status(400).json({
            detail: "serevr error",
        })
    }
}

exports.orderDeliver = async (req, res, next) =>{
    try{
        const ord = {
            isPaid: true,
            paidAt: Date.now(),
            isDelivered: true,
            deliveredAt: Date.now(),
        }
        var id = mongoose.Types.ObjectId(req.params.id)
        const filter = { _id: id }
        let updateOrder = await Order.findOneAndUpdate(filter, ord, {
            new: true
        });
        return res.status(200).json({
            order: updateOrder,
            message: "Order was handed over"
        })
    }
    catch(error)
    {
        return res.status(400).json({
            detail: "serevr error",
        })
    }
}




exports.allOrders = async (req, res, next) =>{
    try{
        const orders = await Order.find().sort({updatedAt:-1}).populate('user');
        return res.status(200).json({
            "orders": orders,
        })
    }
    catch(error)
    {
        return res.status(400).json({
            detail: "serevr error",
        })
    }
}


exports.myOrders = async (req, res, next) =>{
    try{
        const userId = req.userId;
        const orders = await Order.find({user: userId}).sort({updatedAt:-1});
        return res.status(200).json({
            "orders": orders,
        })
    }
    catch(error)
    {
        return res.status(400).json({
            detail: "server error",
        })
    }
}

exports.orderDetails = async (req, res, next) =>{
    try{
        const id = req.params.id;
        const ord = await Order.findById({_id: id});
        const orderItems = await OrderItem.find({ order: id });
        const shippingAddress = await Shipping.findOne({order: id});

        const user = await User.findOne({_id: ord.user})
        const order = {
            orderItems: orderItems,
            order: ord,
            shippingAddress: shippingAddress,
            user: user
        }
        
        return res.status(200).json({
            "order": order,
        });

    }
    catch(error)
    {
        return res.status(400).json({
            "error": error,
        })
    }
}


exports.createOrder = async (req, res, next) => {
  
    try {
        const orderItems = req.body.orderItems;
        const shippingAddress = req.body.shippingAddress;
        const { paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice, userId} = req.body
        if(orderItems && orderItems.length == 0) return res.status(200).json({
            'detail': 'No Order Items'
        });
        const order = new Order({
            user: req.userId,
            paymentMethod: paymentMethod,
            taxPrice: taxPrice,
            shippingPrice: shippingPrice,
            totalPrice: totalPrice,
            isPaid: false,
            isDelivered: false,
        });
        await order.save();

        const shipping = new Shipping({
            order: order._id,
            address: shippingAddress.address,
            city: shippingAddress.city,
            postalCode: shippingAddress.postalCode,
            phone: shippingAddress.phone,
            country: shippingAddress.country
        });
        await shipping.save();
        
        for(const i in orderItems)
        {
            const product = await Product.findById({_id: orderItems[i].product})
            const item = new OrderItem({
                product: product._id,
                order: order._id,
                name: product.name,
                qty: Number(orderItems[i].qty),
                price: Number(orderItems[i].price),
                image: orderItems[i].image
            })
            item.save();
            const left = Number(product.countInStock) - Number(item.qty);
            const pro = {
                countInStock: left
            }
            const filter = { _id: product._id }
            let updateProduct = await Product.findOneAndUpdate(filter, pro, {
                new: true
            });
        }

        return res.status(200).json({
            "order": order,
            "message": "success"
        })
    }
    catch (error) {
        console.log(error)
    }
}