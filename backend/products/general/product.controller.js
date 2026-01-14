const mongoose = require('mongoose');
const GeneralProduct = require('./product.model');

const mockGeneralProducts = [
  {
    id: '1',
    name: 'Dell OptiPlex 7090',
    description: 'Business desktop computer with Intel i7 processor',
    category: 'hardware',
    price: 899,
    stock: 15,
    sku: 'DELL-OPT-7090',
    specifications: {
      processor: 'Intel i7-11700',
      memory: '16GB DDR4',
      storage: '512GB SSD'
    },
    isActive: true
  },
  {
    id: '2',
    name: 'IT Support Package',
    description: 'Monthly IT support and maintenance service',
    category: 'it-support',
    price: 299,
    stock: 999,
    sku: 'IT-SUPPORT-MONTHLY',
    specifications: {
      coverage: '24/7 Support',
      response: '4 hours',
      includes: 'Remote + On-site'
    },
    isActive: true
  }
];

const getAllGeneralProducts = async (req, res) => {
  try {
    if (!mongoose.connection.readyState) {
      return res.json(mockGeneralProducts);
    }
    
    const products = await GeneralProduct.find({ isActive: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGeneralProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.connection.readyState) {
      const product = mockGeneralProducts.find(p => p.id === id);
      return product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
    }
    
    const product = await GeneralProduct.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGeneralProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    if (!mongoose.connection.readyState) {
      const newProduct = {
        id: Date.now().toString(),
        ...productData,
        createdAt: new Date()
      };
      mockGeneralProducts.push(newProduct);
      return res.status(201).json(newProduct);
    }
    
    const product = new GeneralProduct(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateGeneralProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (!mongoose.connection.readyState) {
      const productIndex = mockGeneralProducts.findIndex(p => p.id === id);
      if (productIndex === -1) return res.status(404).json({ error: 'Product not found' });
      
      mockGeneralProducts[productIndex] = { ...mockGeneralProducts[productIndex], ...updates };
      return res.json(mockGeneralProducts[productIndex]);
    }
    
    const product = await GeneralProduct.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteGeneralProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.connection.readyState) {
      const productIndex = mockGeneralProducts.findIndex(p => p.id === id);
      if (productIndex === -1) return res.status(404).json({ error: 'Product not found' });
      
      mockGeneralProducts.splice(productIndex, 1);
      return res.json({ message: 'Product deleted successfully' });
    }
    
    const product = await GeneralProduct.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllGeneralProducts,
  getGeneralProductById,
  createGeneralProduct,
  updateGeneralProduct,
  deleteGeneralProduct
};