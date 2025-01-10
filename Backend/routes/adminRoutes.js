const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');

// Get all orders (including populated product details)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Update order status (e.g., Pending -> Completed)
router.put('/orders/:id/status', async (req, res) => {
  const { orderStatus, paymentStatus } = req.body;

  if (!orderStatus || !paymentStatus) {
    return res.status(400).json({ message: 'Both orderStatus and paymentStatus are required' });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = orderStatus || order.orderStatus;
    order.paymentStatus = paymentStatus || order.paymentStatus;

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status' });
  }
});

// Delete an order by ID
router.delete('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order' });
  }
});

// Get an order by ID (optional, for detailed view)
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order details' });
  }
});

// Manage Products (Optional: For Admin to view or delete products)
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

router.post("/products", async (req, res) => {
  try {
    // Create a new product with the data sent from the frontend
    const newProduct = new Product({
      name: req.body.name,
      image: req.body.image,  // Image URL
      description: req.body.description,
      type: req.body.type,
      brand: req.body.brand,  // Brand URL
      category: req.body.category,
      price: req.body.price,
      discount: req.body.discount || 0,  // Default to 0 if no discount provided
    });

    // Save the new product to the database
    await newProduct.save();

    // Respond with the newly created product
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
});

// Delete a product (Only for Admin)
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
