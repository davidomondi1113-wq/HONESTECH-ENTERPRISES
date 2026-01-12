const mongoose = require('mongoose');

const getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate, period = 'daily' } = req.query;
    
    if (!mongoose.connection.readyState) {
      // Mock sales report data
      const mockSalesReport = {
        period,
        dateRange: { startDate, endDate },
        summary: {
          totalSales: 15750.00,
          totalTransactions: 42,
          averageOrderValue: 375.00,
          totalCustomers: 28
        },
        breakdown: {
          cyber: { sales: 8500.00, transactions: 15 },
          general: { sales: 7250.00, transactions: 27 }
        },
        trends: [
          { date: '2024-01-01', sales: 2500.00, transactions: 8 },
          { date: '2024-01-02', sales: 3200.00, transactions: 12 },
          { date: '2024-01-03', sales: 1800.00, transactions: 6 }
        ]
      };
      return res.json(mockSalesReport);
    }
    
    // Real database aggregation would go here
    res.json({ message: 'Sales report with real data' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventoryReport = async (req, res) => {
  try {
    if (!mongoose.connection.readyState) {
      const mockInventoryReport = {
        summary: {
          totalItems: 156,
          lowStockItems: 8,
          outOfStockItems: 3,
          totalValue: 45600.00
        },
        categories: {
          hardware: { items: 45, value: 25600.00, lowStock: 3 },
          software: { items: 32, value: 8900.00, lowStock: 2 },
          services: { items: 79, value: 11100.00, lowStock: 3 }
        },
        alerts: [
          { sku: 'DELL-OPT-7090', name: 'Dell OptiPlex 7090', currentStock: 2, minStock: 5 },
          { sku: 'HP-LASER-401', name: 'HP LaserJet Pro 401', currentStock: 0, minStock: 3 }
        ]
      };
      return res.json(mockInventoryReport);
    }
    
    res.json({ message: 'Inventory report with real data' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCustomerReport = async (req, res) => {
  try {
    if (!mongoose.connection.readyState) {
      const mockCustomerReport = {
        summary: {
          totalCustomers: 128,
          activeCustomers: 95,
          newCustomers: 12,
          customerRetention: 74.2
        },
        topCustomers: [
          { name: 'ABC Corp', totalSpent: 8500.00, orders: 15 },
          { name: 'XYZ Ltd', totalSpent: 6200.00, orders: 12 },
          { name: 'Tech Solutions', totalSpent: 4800.00, orders: 8 }
        ],
        segments: {
          enterprise: { count: 25, revenue: 45600.00 },
          business: { count: 58, revenue: 28900.00 },
          individual: { count: 45, revenue: 12400.00 }
        }
      };
      return res.json(mockCustomerReport);
    }
    
    res.json({ message: 'Customer report with real data' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFinancialReport = async (req, res) => {
  try {
    const { year = new Date().getFullYear(), month } = req.query;
    
    if (!mongoose.connection.readyState) {
      const mockFinancialReport = {
        period: { year, month },
        revenue: {
          total: 87500.00,
          cyber: 52500.00,
          general: 35000.00
        },
        expenses: {
          total: 45200.00,
          inventory: 28500.00,
          operations: 12700.00,
          marketing: 4000.00
        },
        profit: {
          gross: 42300.00,
          net: 38100.00,
          margin: 43.5
        },
        monthlyTrends: [
          { month: 'Jan', revenue: 7200.00, profit: 3100.00 },
          { month: 'Feb', revenue: 8500.00, profit: 3800.00 },
          { month: 'Mar', revenue: 9200.00, profit: 4200.00 }
        ]
      };
      return res.json(mockFinancialReport);
    }
    
    res.json({ message: 'Financial report with real data' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDashboardData = async (req, res) => {
  try {
    if (!mongoose.connection.readyState) {
      const mockDashboard = {
        kpis: {
          todaySales: 2850.00,
          monthSales: 15750.00,
          totalCustomers: 128,
          pendingOrders: 8,
          lowStockAlerts: 5
        },
        recentTransactions: [
          { id: '1', customer: 'John Doe', amount: 899.00, status: 'completed' },
          { id: '2', customer: 'Jane Smith', amount: 1250.00, status: 'pending' }
        ],
        salesChart: [
          { date: '2024-01-01', amount: 2500 },
          { date: '2024-01-02', amount: 3200 },
          { date: '2024-01-03', amount: 1800 }
        ],
        topProducts: [
          { name: 'Security Audit', sales: 8500.00, orders: 15 },
          { name: 'Dell OptiPlex 7090', sales: 4495.00, orders: 5 }
        ]
      };
      return res.json(mockDashboard);
    }
    
    res.json({ message: 'Dashboard data with real data' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductPerformance = async (req, res) => {
  try {
    const { category, period = '30d' } = req.query;
    
    if (!mongoose.connection.readyState) {
      const mockProductReport = {
        period,
        category,
        summary: {
          totalProducts: 45,
          bestSeller: 'Security Audit',
          totalRevenue: 25600.00
        },
        products: [
          {
            name: 'Security Audit',
            category: 'cyber',
            sales: 8500.00,
            orders: 15,
            revenue: 8500.00,
            growth: 12.5
          },
          {
            name: 'Dell OptiPlex 7090',
            category: 'hardware',
            sales: 4495.00,
            orders: 5,
            revenue: 4495.00,
            growth: -2.1
          }
        ]
      };
      return res.json(mockProductReport);
    }
    
    res.json({ message: 'Product performance with real data' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSalesReport,
  getInventoryReport,
  getCustomerReport,
  getFinancialReport,
  getDashboardData,
  getProductPerformance
};