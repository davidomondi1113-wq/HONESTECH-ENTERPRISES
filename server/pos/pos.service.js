const mongoose = require('mongoose');
const Transaction = require('../transactions/transaction.model');

// Mock POS session data
let currentSession = null;
const mockSessions = [];

const processSale = async (saleData) => {
  const { customerId, items, paymentMethod, discountPercent = 0, taxPercent = 10 } = saleData;
  
  // Calculate totals
  const calculation = await calculateOrderTotal(items, discountPercent, taxPercent);
  
  // Create transaction
  const transactionData = {
    customerId,
    items: items.map(item => ({
      ...item,
      totalPrice: item.quantity * item.unitPrice
    })),
    subtotal: calculation.subtotal,
    tax: calculation.tax,
    discount: calculation.discount,
    total: calculation.total,
    paymentMethod,
    status: 'confirmed',
    paymentStatus: 'completed'
  };
  
  if (!mongoose.connection.readyState) {
    // Mock transaction creation
    const mockTransaction = {
      id: Date.now().toString(),
      transactionId: 'TXN-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      ...transactionData,
      createdAt: new Date()
    };
    
    return {
      transaction: mockTransaction,
      receipt: generateReceipt(mockTransaction)
    };
  }
  
  const transaction = new Transaction(transactionData);
  await transaction.save();
  
  return {
    transaction,
    receipt: generateReceipt(transaction)
  };
};

const calculateOrderTotal = async (items, discountPercent = 0, taxPercent = 10) => {
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.quantity * item.unitPrice);
  }, 0);
  
  const discount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discount;
  const tax = (taxableAmount * taxPercent) / 100;
  const total = taxableAmount + tax;
  
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discount: Math.round(discount * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
  };
};

const processPayment = async (transactionId, paymentMethod, amount) => {
  // Mock payment processing
  const success = Math.random() > 0.1; // 90% success rate
  
  if (!success) {
    throw new Error('Payment processing failed');
  }
  
  return {
    success: true,
    paymentId: 'PAY-' + Date.now(),
    transactionId,
    amount,
    paymentMethod,
    processedAt: new Date()
  };
};

const getDailySalesReport = async (date = new Date().toISOString().split('T')[0]) => {
  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);
  
  if (!mongoose.connection.readyState) {
    // Mock daily sales
    return {
      date,
      totalSales: 2500.00,
      totalTransactions: 15,
      averageOrderValue: 166.67,
      paymentMethods: {
        cash: 800.00,
        card: 1500.00,
        'bank-transfer': 200.00
      }
    };
  }
  
  const report = await Transaction.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lt: endDate },
        status: 'completed'
      }
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$total' },
        totalTransactions: { $sum: 1 },
        averageOrderValue: { $avg: '$total' },
        paymentMethods: {
          $push: {
            method: '$paymentMethod',
            amount: '$total'
          }
        }
      }
    }
  ]);
  
  return report[0] || {
    date,
    totalSales: 0,
    totalTransactions: 0,
    averageOrderValue: 0,
    paymentMethods: {}
  };
};

const startPOSSession = async (cashierName, openingCash = 0) => {
  if (currentSession && currentSession.status === 'active') {
    throw new Error('A POS session is already active');
  }
  
  currentSession = {
    id: Date.now().toString(),
    cashierName,
    openingCash,
    startTime: new Date(),
    status: 'active',
    transactions: []
  };
  
  return currentSession;
};

const endPOSSession = async (closingCash) => {
  if (!currentSession || currentSession.status !== 'active') {
    throw new Error('No active POS session found');
  }
  
  currentSession.closingCash = closingCash;
  currentSession.endTime = new Date();
  currentSession.status = 'closed';
  currentSession.cashDifference = closingCash - currentSession.openingCash;
  
  mockSessions.push({ ...currentSession });
  const closedSession = { ...currentSession };
  currentSession = null;
  
  return closedSession;
};

const getCurrentSession = async () => {
  return currentSession || { status: 'inactive' };
};

const generateReceipt = (transaction) => {
  return {
    transactionId: transaction.transactionId,
    date: transaction.createdAt || new Date(),
    items: transaction.items,
    subtotal: transaction.subtotal,
    tax: transaction.tax,
    discount: transaction.discount,
    total: transaction.total,
    paymentMethod: transaction.paymentMethod,
    receiptNumber: 'RCP-' + Date.now()
  };
};

module.exports = {
  processSale,
  calculateOrderTotal,
  processPayment,
  getDailySalesReport,
  startPOSSession,
  endPOSSession,
  getCurrentSession
};