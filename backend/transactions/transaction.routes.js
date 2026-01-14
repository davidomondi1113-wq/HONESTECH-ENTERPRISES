const express = require('express');
const { body } = require('express-validator');
const transactionController = require('./transaction.controller');
const { authenticate, authorize } = require('../auth/auth.middleware');

const router = express.Router();

// Get all transactions (admin only)
router.get('/', authenticate, authorize('admin'), transactionController.getAllTransactions);

// Get sales report (admin only)
router.get('/report', authenticate, authorize('admin'), transactionController.getSalesReport);

// Get transaction by ID (admin or own transaction)
router.get('/:id', authenticate, transactionController.getTransactionById);

// Get transactions by customer (admin or own transactions)
router.get('/customer/:customerId', authenticate, transactionController.getTransactionsByCustomer);

// Create new transaction (authenticated users)
router.post('/', authenticate, [
  body('customerId').notEmpty(),
  body('items').isArray({ min: 1 }),
  body('items.*.productId').notEmpty(),
  body('items.*.productType').isIn(['GeneralProduct', 'CyberProduct']),
  body('items.*.quantity').isInt({ min: 1 }),
  body('items.*.unitPrice').isFloat({ min: 0 }),
  body('paymentMethod').isIn(['cash', 'card', 'bank-transfer', 'check']),
  body('subtotal').isFloat({ min: 0 }),
  body('total').isFloat({ min: 0 })
], transactionController.createTransaction);

// Update transaction status (admin only)
router.patch('/:id/status', authenticate, authorize('admin'), [
  body('status').optional().isIn(['draft', 'confirmed', 'processing', 'completed', 'cancelled']),
  body('paymentStatus').optional().isIn(['pending', 'completed', 'failed', 'refunded'])
], transactionController.updateTransactionStatus);

module.exports = router;