const mongoose = require('mongoose');
const Transaction = require('./transaction.model');

const mockTransactions = [
  {
    id: '1',
    transactionId: 'TXN-1234567890-ABC12',
    customerId: '2',
    items: [{
      productId: '1',
      productType: 'GeneralProduct',
      quantity: 1,
      unitPrice: 899,
      totalPrice: 899
    }],
    subtotal: 899,
    tax: 89.9,
    discount: 0,
    total: 988.9,
    paymentMethod: 'card',
    paymentStatus: 'completed',
    status: 'completed',
    createdAt: new Date()
  }
];

const getAllTransactions = async (req, res) => {
  try {
    if (!mongoose.connection.readyState) {
      return res.json(mockTransactions);
    }
    
    const transactions = await Transaction.find()
      .populate('customerId', 'email profile')
      .populate('items.productId')
      .sort({ createdAt: -1 });
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.connection.readyState) {
      const transaction = mockTransactions.find(t => t.id === id);
      return transaction ? res.json(transaction) : res.status(404).json({ error: 'Transaction not found' });
    }
    
    const transaction = await Transaction.findById(id)
      .populate('customerId', 'email profile')
      .populate('items.productId');
    
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTransaction = async (req, res) => {
  try {
    const transactionData = req.body;
    
    if (!mongoose.connection.readyState) {
      const newTransaction = {
        id: Date.now().toString(),
        transactionId: 'TXN-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        ...transactionData,
        createdAt: new Date()
      };
      mockTransactions.push(newTransaction);
      return res.status(201).json(newTransaction);
    }
    
    const transaction = new Transaction(transactionData);
    await transaction.save();
    
    const populatedTransaction = await Transaction.findById(transaction._id)
      .populate('customerId', 'email profile')
      .populate('items.productId');
    
    res.status(201).json(populatedTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTransactionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;
    
    if (!mongoose.connection.readyState) {
      const transactionIndex = mockTransactions.findIndex(t => t.id === id);
      if (transactionIndex === -1) return res.status(404).json({ error: 'Transaction not found' });
      
      if (status) mockTransactions[transactionIndex].status = status;
      if (paymentStatus) mockTransactions[transactionIndex].paymentStatus = paymentStatus;
      
      return res.json(mockTransactions[transactionIndex]);
    }
    
    const updates = {};
    if (status) updates.status = status;
    if (paymentStatus) updates.paymentStatus = paymentStatus;
    
    const transaction = await Transaction.findByIdAndUpdate(id, updates, { new: true })
      .populate('customerId', 'email profile')
      .populate('items.productId');
    
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTransactionsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    
    if (!mongoose.connection.readyState) {
      const customerTransactions = mockTransactions.filter(t => t.customerId === customerId);
      return res.json(customerTransactions);
    }
    
    const transactions = await Transaction.find({ customerId })
      .populate('items.productId')
      .sort({ createdAt: -1 });
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!mongoose.connection.readyState) {
      const totalSales = mockTransactions.reduce((sum, t) => sum + t.total, 0);
      return res.json({
        totalTransactions: mockTransactions.length,
        totalSales,
        averageOrderValue: totalSales / mockTransactions.length || 0
      });
    }
    
    const matchQuery = { status: 'completed' };
    if (startDate && endDate) {
      matchQuery.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    const report = await Transaction.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          totalTransactions: { $sum: 1 },
          totalSales: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' }
        }
      }
    ]);
    
    res.json(report[0] || { totalTransactions: 0, totalSales: 0, averageOrderValue: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransactionStatus,
  getTransactionsByCustomer,
  getSalesReport
};