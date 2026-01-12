const express = require('express');
const { body } = require('express-validator');
const cyberProductController = require('./product.controller');
const { authenticate, authorize } = require('../../auth/auth.middleware');

const router = express.Router();

// Get all cyber products (public)
router.get('/', cyberProductController.getAllCyberProducts);

// Get cyber product by ID (public)
router.get('/:id', cyberProductController.getCyberProductById);

// Create cyber product (admin only)
router.post('/', authenticate, authorize('admin'), [
  body('name').notEmpty().trim(),
  body('description').notEmpty().trim(),
  body('category').isIn(['security-audit', 'penetration-testing', 'vulnerability-assessment', 'security-consulting', 'incident-response']),
  body('price').isNumeric().isFloat({ min: 0 }),
  body('duration').notEmpty().trim()
], cyberProductController.createCyberProduct);

// Update cyber product (admin only)
router.put('/:id', authenticate, authorize('admin'), cyberProductController.updateCyberProduct);

// Delete cyber product (admin only)
router.delete('/:id', authenticate, authorize('admin'), cyberProductController.deleteCyberProduct);

module.exports = router;