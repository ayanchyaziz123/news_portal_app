const express = require('express');
const router = express.Router();
const checkLogIn = require('../middleware/checkLogIn');
const isAdminCheck = require('../middleware/isAdminCheck');



const {orderPaid ,orderDeliver ,myOrders,allOrders, createOrder, orderDetails} = require('../controllers/orderController');



router.route('/createOrder').post(checkLogIn ,createOrder);
router.route('/orderDetails/:id').get(checkLogIn, orderDetails);
router.route('/myOrders').get(checkLogIn, myOrders);
router.route('/allOrders').get(isAdminCheck, allOrders);
router.route('/orderDeliver/:id/deliver').get(orderDeliver);
router.route('/orderPay/:id/pay').put(orderPaid);

module.exports = router;