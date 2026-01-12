const express = require('express');
const { body } = require('express-validator');
const userController = require('./user.controller');
const { authenticate, authorize } = require('../auth/auth.middleware');

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticate, authorize('admin'), userController.getAllUsers);

// Get user by ID (admin or own profile)
router.get('/:id', authenticate, userController.getUserById);

// Create new user (admin only)
router.post('/', authenticate, authorize('admin'), [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('role').optional().isIn(['admin', 'customer'])
], userController.createUser);

// Update user (admin or own profile)
router.put('/:id', authenticate, [
  body('email').optional().isEmail().normalizeEmail(),
  body('password').optional().isLength({ min: 6 }),
  body('role').optional().isIn(['admin', 'customer'])
], userController.updateUser);

// Delete user (admin only)
router.delete('/:id', authenticate, authorize('admin'), userController.deleteUser);

module.exports = router;