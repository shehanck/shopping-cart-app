const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search ? { title: { $regex: search, $options: 'i' } } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.rateProduct = async (req, res) => {
  const { value } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  const existingRating = product.ratings.find(r => r.userId.toString() === req.user.id);

  if (existingRating) {
    existingRating.value = value; // Update existing rating
  } else {
    product.ratings.push({ userId: req.user.id, value }); // New rating
  }

  await product.save();
  res.json({ message: 'Rating saved', average: product.getAverageRating() });
};
