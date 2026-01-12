const express = require('express');
const { body } = require('express-validator');
const authController = require('./auth.controller');

const router = express.Router();

// Login route
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], authController.login);

// Register route
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('role').optional().isIn(['admin', 'customer'])
], authController.register);

// Logout route
router.post('/logout', authController.logout);

module.exports = router;