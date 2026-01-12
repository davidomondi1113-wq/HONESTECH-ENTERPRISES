const mongoose = require('mongoose');

const generalProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['hardware', 'software', 'it-support', 'networking', 'cloud-services'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  specifications: {
    type: Map,
    of: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GeneralProduct', generalProductSchema);