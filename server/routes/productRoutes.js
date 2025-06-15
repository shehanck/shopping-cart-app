const express = require('express');
const { getProducts, rateProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getProducts);
router.post('/:id/rate', authMiddleware, rateProduct);

// Add this temporary route in productRoutes.js
router.get('/seed', async (req, res) => {
  await Product.deleteMany();
  await Product.insertMany([
    { title: 'Phone', price: 799, discount: 10, image: 'https://via.placeholder.com/150' },
    { title: 'Laptop', price: 1200, discount: 15, image: 'https://via.placeholder.com/150' },
    { title: 'Headphones', price: 199, discount: 5, image: 'https://via.placeholder.com/150' },
  ]);
  console.log('Products seeded');
  res.send('Seeded!');
});

module.exports = router;
