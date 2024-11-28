const express = require('express');
const Order = require('../models/order');
const Cart = require('../models/cart');
const router = express.Router();

// Create an order
router.post('/create', async (req, res) => {
  const { userId } = req.body;
  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const totalAmount = cart.items.reduce((total, item) => total + item.productId.price * item.quantity, 0);
    
    const order = new Order({
      userId,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      totalAmount,
    });

    await order.save();
    // Optionally, clear the user's cart after order creation
    cart.items = [];
    await cart.save();

    res.status(200).json({ orderId: order._id, totalAmount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update payment status
router.post('/payment-success', async (req, res) => {
  const { paymentId, orderId } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.paymentStatus = 'Success';
    order.paymentId = paymentId;
    order.orderStatus = 'Completed';
    await order.save();

    res.status(200).json({ message: 'Payment successful' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

module.exports = router;
