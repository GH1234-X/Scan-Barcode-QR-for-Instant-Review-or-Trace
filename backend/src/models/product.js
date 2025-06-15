const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  barcode: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  brand: String,
  origin: {
    country: String,
    region: String,
    coordinates: String // Could be geolocation data
  },
  ingredients: [String],
  sustainabilityData: {
    carbonFootprint: Number,
    ethicalRating: Number,
    recyclable: Boolean
  },
  manufacturingDate: Date,
  expiryDate: Date,
  qrCode: String,
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);