const express = require('express');
const { body } = require('express-validator');
const inventoryController = require('./inventory.controller');
const { authenticate, authorize } = require('../auth/auth.middleware');

const router = express.Router();

// Get all inventory items (admin only)
router.get('/', authenticate, authorize('admin'), inventoryController.getAllInventory);

// Get low stock items (admin only)
router.get('/low-stock', authenticate, authorize('admin'), inventoryController.getLowStockItems);

// Get inventory item by ID (admin only)
router.get('/:id', authenticate, authorize('admin'), inventoryController.getInventoryById);

// Create inventory item (admin only)
router.post('/', authenticate, authorize('admin'), [
  body('productId').notEmpty(),
  body('productType').isIn(['GeneralProduct', 'CyberProduct']),
  body('sku').notEmpty().trim(),
  body('currentStock').isInt({ min: 0 }),
  body('minStock').optional().isInt({ min: 0 }),
  body('maxStock').optional().isInt({ min: 1 })
], inventoryController.createInventoryItem);

// Update inventory item (admin only)
router.put('/:id', authenticate, authorize('admin'), inventoryController.updateInventoryItem);

// Adjust stock (admin only)
router.patch('/:id/adjust', authenticate, authorize('admin'), [
  body('quantity').isInt({ min: 1 }),
  body('type').isIn(['add', 'remove'])
], inventoryController.adjustStock);

module.exports = router;