const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const { cartItems } = req.body;

  try {
    const orderItems = await Promise.all(cartItems.map(async (item) => {
      const product = await Product.findById(item._id);
      return {
        productId: product._id,
        title: product.title,
        price: product.price,
        discount: product.discount,
        quantity: item.quantity,
      };
    }));

    const total = orderItems.reduce((sum, item) => {
      const discountedPrice = item.price * (1 - item.discount / 100);
      return sum + item.quantity * discountedPrice;
    }, 0);

    const order = new Order({
      userId: req.user.id,
      items: orderItems,
      total,
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
