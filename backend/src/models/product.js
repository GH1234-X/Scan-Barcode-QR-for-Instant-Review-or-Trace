import mongoose from 'mongoose';

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
    coordinates: String
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
  image: { type: String },

  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],

  // Optional: Store average rating (you can update it via middleware or controller)
  averageRating: {
    type: Number,
    default: 0
  },
  numReviews: {
  type: Number,
  default: 0
},

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
