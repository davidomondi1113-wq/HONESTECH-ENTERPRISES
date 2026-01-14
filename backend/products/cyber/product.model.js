const mongoose = require('mongoose');

const cyberProductSchema = new mongoose.Schema({
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
    enum: ['security-audit', 'penetration-testing', 'vulnerability-assessment', 'security-consulting', 'incident-response'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String, // e.g., "2 weeks", "1 month"
    required: true
  },
  features: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CyberProduct', cyberProductSchema);