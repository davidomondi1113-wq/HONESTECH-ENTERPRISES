const express = require('express');
const reportController = require('./report.controller');
const { authenticate, authorize } = require('../auth/auth.middleware');

const router = express.Router();

// Dashboard data (admin only)
router.get('/dashboard', authenticate, authorize('admin'), reportController.getDashboardData);

// Sales reports (admin only)
router.get('/sales', authenticate, authorize('admin'), reportController.getSalesReport);

// Inventory reports (admin only)
router.get('/inventory', authenticate, authorize('admin'), reportController.getInventoryReport);

// Customer reports (admin only)
router.get('/customers', authenticate, authorize('admin'), reportController.getCustomerReport);

// Financial reports (admin only)
router.get('/financial', authenticate, authorize('admin'), reportController.getFinancialReport);

// Product performance reports (admin only)
router.get('/products', authenticate, authorize('admin'), reportController.getProductPerformance);

module.exports = router;