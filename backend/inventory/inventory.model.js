const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'productType'
  },
  productType: {
    type: String,
    required: true,
    enum: ['GeneralProduct', 'CyberProduct']
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  currentStock: {
    type: Number,
    required: true,
    min: 0
  },
  minStock: {
    type: Number,
    default: 5
  },
  maxStock: {
    type: Number,
    default: 100
  },
  location: {
    warehouse: String,
    shelf: String,
    bin: String
  },
  lastRestocked: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['in-stock', 'low-stock', 'out-of-stock', 'discontinued'],
    default: 'in-stock'
  }
}, {
  timestamps: true
});

inventorySchema.pre('save', function(next) {
  if (this.currentStock <= 0) {
    this.status = 'out-of-stock';
  } else if (this.currentStock <= this.minStock) {
    this.status = 'low-stock';
  } else {
    this.status = 'in-stock';
  }
  next();
});

module.exports = mongoose.model('Inventory', inventorySchema);