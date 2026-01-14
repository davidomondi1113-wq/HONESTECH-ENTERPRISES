const express = require('express');
const { body } = require('express-validator');
const documentController = require('./document.controller');
const { authenticate, authorize } = require('../auth/auth.middleware');

const router = express.Router();

// Get all documents (admin only)
router.get('/', authenticate, authorize('admin'), documentController.getAllDocuments);

// Get document by ID (admin or document owner)
router.get('/:id', authenticate, documentController.getDocumentById);

// Get documents by customer (admin or own documents)
router.get('/customer/:customerId', authenticate, documentController.getDocumentsByCustomer);

// Generate PDF (authenticated users)
router.get('/:id/pdf', authenticate, documentController.generatePDF);

// Create document (admin only)
router.post('/', authenticate, authorize('admin'), [
  body('type').isIn(['invoice', 'quote', 'receipt', 'report', 'contract']),
  body('title').notEmpty().trim(),
  body('customerId').optional().isMongoId(),
  body('transactionId').optional().isMongoId(),
  body('content').optional().isObject()
], documentController.createDocument);

// Update document (admin only)
router.put('/:id', authenticate, authorize('admin'), documentController.updateDocument);

// Delete document (admin only)
router.delete('/:id', authenticate, authorize('admin'), documentController.deleteDocument);

module.exports = router;