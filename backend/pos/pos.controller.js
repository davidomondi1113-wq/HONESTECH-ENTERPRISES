const posService = require('./pos.service');

const createSale = async (req, res) => {
  try {
    const saleData = req.body;
    const result = await posService.processSale(saleData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const calculateTotal = async (req, res) => {
  try {
    const { items, discountPercent = 0, taxPercent = 10 } = req.body;
    const calculation = await posService.calculateOrderTotal(items, discountPercent, taxPercent);
    res.json(calculation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const processPayment = async (req, res) => {
  try {
    const { transactionId, paymentMethod, amount } = req.body;
    const result = await posService.processPayment(transactionId, paymentMethod, amount);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDailySales = async (req, res) => {
  try {
    const { date } = req.query;
    const sales = await posService.getDailySalesReport(date);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getActiveSession = async (req, res) => {
  try {
    const session = await posService.getCurrentSession();
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const startSession = async (req, res) => {
  try {
    const { cashierName, openingCash = 0 } = req.body;
    const session = await posService.startPOSSession(cashierName, openingCash);
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const endSession = async (req, res) => {
  try {
    const { closingCash } = req.body;
    const session = await posService.endPOSSession(closingCash);
    res.json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSale,
  calculateTotal,
  processPayment,
  getDailySales,
  getActiveSession,
  startSession,
  endSession
};