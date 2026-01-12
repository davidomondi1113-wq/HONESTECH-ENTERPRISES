const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { PORT, CORS_ORIGIN } = require('./config/env');
const authRoutes = require('./auth/auth.routes');
const userRoutes = require('./users/user.routes');
const cyberProductRoutes = require('./products/cyber/product.routes');
const generalProductRoutes = require('./products/general/product.routes');
const inventoryRoutes = require('./inventory/inventory.routes');
const transactionRoutes = require('./transactions/transaction.routes');
const posRoutes = require('./pos/pos.routes');
const documentRoutes = require('./documents/document.routes');
const reportRoutes = require('./reports/report.routes');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products/cyber', cyberProductRoutes);
app.use('/api/products/general', generalProductRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/pos', posRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'HonesTech API Server Running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});