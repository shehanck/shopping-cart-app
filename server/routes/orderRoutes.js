const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/my', authMiddleware, getUserOrders);

module.exports = router;
