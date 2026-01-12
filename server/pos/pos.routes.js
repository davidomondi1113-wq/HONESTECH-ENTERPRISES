const express = require('express');
const { body } = require('express-validator');
const posController = require('./pos.controller');
const { authenticate, authorize } = require('../auth/auth.middleware');

const router = express.Router();

// Create sale (admin only)
router.post('/sale', authenticate, authorize('admin'), [
  body('customerId').notEmpty(),
  body('items').isArray({ min: 1 }),
  body('items.*.productId').notEmpty(),
  body('items.*.quantity').isInt({ min: 1 }),
  body('items.*.unitPrice').isFloat({ min: 0 }),
  body('paymentMethod').isIn(['cash', 'card', 'bank-transfer', 'check'])
], posController.createSale);

// Calculate order total (admin only)
router.post('/calculate', authenticate, authorize('admin'), [
  body('items').isArray({ min: 1 }),
  body('discountPercent').optional().isFloat({ min: 0, max: 100 }),
  body('taxPercent').optional().isFloat({ min: 0, max: 100 })
], posController.calculateTotal);

// Process payment (admin only)
router.post('/payment', authenticate, authorize('admin'), [
  body('transactionId').notEmpty(),
  body('paymentMethod').isIn(['cash', 'card', 'bank-transfer', 'check']),
  body('amount').isFloat({ min: 0 })
], posController.processPayment);

// Get daily sales report (admin only)
router.get('/sales/daily', authenticate, authorize('admin'), posController.getDailySales);

// Session management (admin only)
router.get('/session', authenticate, authorize('admin'), posController.getActiveSession);

router.post('/session/start', authenticate, authorize('admin'), [
  body('cashierName').notEmpty().trim(),
  body('openingCash').optional().isFloat({ min: 0 })
], posController.startSession);

router.post('/session/end', authenticate, authorize('admin'), [
  body('closingCash').isFloat({ min: 0 })
], posController.endSession);

module.exports = router;