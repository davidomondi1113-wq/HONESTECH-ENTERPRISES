const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  documentNumber: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    enum: ['invoice', 'quote', 'receipt', 'report', 'contract'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return ['invoice', 'quote', 'receipt', 'contract'].includes(this.type);
    }
  },
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: function() {
      return ['invoice', 'receipt'].includes(this.type);
    }
  },
  content: {
    items: [{
      description: String,
      quantity: Number,
      unitPrice: Number,
      totalPrice: Number
    }],
    subtotal: Number,
    tax: Number,
    discount: Number,
    total: Number,
    notes: String
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'viewed', 'approved', 'paid', 'cancelled'],
    default: 'draft'
  },
  filePath: String,
  fileSize: Number,
  mimeType: String,
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  validUntil: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

documentSchema.pre('save', function(next) {
  if (!this.documentNumber) {
    const prefix = this.type.toUpperCase().substr(0, 3);
    this.documentNumber = `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model('Document', documentSchema);