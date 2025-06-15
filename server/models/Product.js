const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  value: { type: Number, required: true, min: 1, max: 5 },
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  image: { type: String },
  ratings: [ratingSchema],
});

productSchema.methods.getAverageRating = function () {
  if (this.ratings.length === 0) return 0;
  const total = this.ratings.reduce((sum, r) => sum + r.value, 0);
  return (total / this.ratings.length).toFixed(1);
};

module.exports = mongoose.model('Product', productSchema);
