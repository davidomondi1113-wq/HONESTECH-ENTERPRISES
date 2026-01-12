const mongoose = require('mongoose');
const Inventory = require('./inventory.model');

const mockInventory = [
  {
    id: '1',
    productId: '1',
    productType: 'GeneralProduct',
    sku: 'DELL-OPT-7090',
    currentStock: 15,
    minStock: 5,
    maxStock: 50,
    location: { warehouse: 'A', shelf: '1', bin: 'A1' },
    status: 'in-stock',
    lastRestocked: new Date()
  },
  {
    id: '2',
    productId: '2',
    productType: 'GeneralProduct',
    sku: 'IT-SUPPORT-MONTHLY',
    currentStock: 999,
    minStock: 100,
    maxStock: 999,
    location: { warehouse: 'Virtual', shelf: 'N/A', bin: 'N/A' },
    status: 'in-stock',
    lastRestocked: new Date()
  }
];

const getAllInventory = async (req, res) => {
  try {
    if (!mongoose.connection.readyState) {
      return res.json(mockInventory);
    }
    
    const inventory = await Inventory.find().populate('productId');
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventoryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.connection.readyState) {
      const item = mockInventory.find(i => i.id === id);
      return item ? res.json(item) : res.status(404).json({ error: 'Inventory item not found' });
    }
    
    const item = await Inventory.findById(id).populate('productId');
    if (!item) return res.status(404).json({ error: 'Inventory item not found' });
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createInventoryItem = async (req, res) => {
  try {
    const itemData = req.body;
    
    if (!mongoose.connection.readyState) {
      const newItem = {
        id: Date.now().toString(),
        ...itemData,
        createdAt: new Date()
      };
      mockInventory.push(newItem);
      return res.status(201).json(newItem);
    }
    
    const item = new Inventory(itemData);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (!mongoose.connection.readyState) {
      const itemIndex = mockInventory.findIndex(i => i.id === id);
      if (itemIndex === -1) return res.status(404).json({ error: 'Inventory item not found' });
      
      mockInventory[itemIndex] = { ...mockInventory[itemIndex], ...updates };
      return res.json(mockInventory[itemIndex]);
    }
    
    const item = await Inventory.findByIdAndUpdate(id, updates, { new: true });
    if (!item) return res.status(404).json({ error: 'Inventory item not found' });
    
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const adjustStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, type } = req.body; // type: 'add' or 'remove'
    
    if (!mongoose.connection.readyState) {
      const itemIndex = mockInventory.findIndex(i => i.id === id);
      if (itemIndex === -1) return res.status(404).json({ error: 'Inventory item not found' });
      
      const currentStock = mockInventory[itemIndex].currentStock;
      const newStock = type === 'add' ? currentStock + quantity : currentStock - quantity;
      
      if (newStock < 0) return res.status(400).json({ error: 'Insufficient stock' });
      
      mockInventory[itemIndex].currentStock = newStock;
      mockInventory[itemIndex].lastRestocked = new Date();
      
      return res.json(mockInventory[itemIndex]);
    }
    
    const item = await Inventory.findById(id);
    if (!item) return res.status(404).json({ error: 'Inventory item not found' });
    
    const newStock = type === 'add' ? item.currentStock + quantity : item.currentStock - quantity;
    
    if (newStock < 0) return res.status(400).json({ error: 'Insufficient stock' });
    
    item.currentStock = newStock;
    if (type === 'add') item.lastRestocked = new Date();
    
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLowStockItems = async (req, res) => {
  try {
    if (!mongoose.connection.readyState) {
      const lowStock = mockInventory.filter(i => i.status === 'low-stock' || i.status === 'out-of-stock');
      return res.json(lowStock);
    }
    
    const lowStock = await Inventory.find({
      status: { $in: ['low-stock', 'out-of-stock'] }
    }).populate('productId');
    
    res.json(lowStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllInventory,
  getInventoryById,
  createInventoryItem,
  updateInventoryItem,
  adjustStock,
  getLowStockItems
};