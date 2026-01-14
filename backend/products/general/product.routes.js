const express = require('express');
const { body } = require('express-validator');
const generalProductController = require('./product.controller');
const { authenticate, authorize } = require('../../auth/auth.middleware');

const router = express.Router();

// Get all general products (public)
router.get('/', generalProductController.getAllGeneralProducts);

// Get general product by ID (public)
router.get('/:id', generalProductController.getGeneralProductById);

// Create general product (admin only)
router.post('/', authenticate, authorize('admin'), [
  body('name').notEmpty().trim(),
  body('description').notEmpty().trim(),
  body('category').isIn(['hardware', 'software', 'it-support', 'networking', 'cloud-services']),
  body('price').isNumeric().isFloat({ min: 0 }),
  body('sku').notEmpty().trim(),
  body('stock').optional().isInt({ min: 0 })
], generalProductController.createGeneralProduct);

// Update general product (admin only)
router.put('/:id', authenticate, authorize('admin'), generalProductController.updateGeneralProduct);

// Delete general product (admin only)
router.delete('/:id', authenticate, authorize('admin'), generalProductController.deleteGeneralProduct);

module.exports = router;