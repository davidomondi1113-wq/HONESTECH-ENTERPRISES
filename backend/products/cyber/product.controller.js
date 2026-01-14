const mongoose = require('mongoose');
const CyberProduct = require('./product.model');

const mockCyberProducts = [
  {
    id: '1',
    name: 'Security Audit',
    description: 'Comprehensive security assessment of your systems',
    category: 'security-audit',
    price: 2500,
    duration: '2 weeks',
    features: ['Network Security', 'Application Security', 'Compliance Check'],
    isActive: true
  },
  {
    id: '2',
    name: 'Penetration Testing',
    description: 'Ethical hacking to identify vulnerabilities',
    category: 'penetration-testing',
    price: 3500,
    duration: '3 weeks',
    features: ['Web App Testing', 'Network Testing', 'Social Engineering'],
    isActive: true
  }
];

const getAllCyberProducts = async (req, res) => {
  try {
    if (!mongoose.connection.readyState) {
      return res.json(mockCyberProducts);
    }
    
    const products = await CyberProduct.find({ isActive: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCyberProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.connection.readyState) {
      const product = mockCyberProducts.find(p => p.id === id);
      return product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
    }
    
    const product = await CyberProduct.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCyberProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    if (!mongoose.connection.readyState) {
      const newProduct = {
        id: Date.now().toString(),
        ...productData,
        createdAt: new Date()
      };
      mockCyberProducts.push(newProduct);
      return res.status(201).json(newProduct);
    }
    
    const product = new CyberProduct(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCyberProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (!mongoose.connection.readyState) {
      const productIndex = mockCyberProducts.findIndex(p => p.id === id);
      if (productIndex === -1) return res.status(404).json({ error: 'Product not found' });
      
      mockCyberProducts[productIndex] = { ...mockCyberProducts[productIndex], ...updates };
      return res.json(mockCyberProducts[productIndex]);
    }
    
    const product = await CyberProduct.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCyberProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.connection.readyState) {
      const productIndex = mockCyberProducts.findIndex(p => p.id === id);
      if (productIndex === -1) return res.status(404).json({ error: 'Product not found' });
      
      mockCyberProducts.splice(productIndex, 1);
      return res.json({ message: 'Product deleted successfully' });
    }
    
    const product = await CyberProduct.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCyberProducts,
  getCyberProductById,
  createCyberProduct,
  updateCyberProduct,
  deleteCyberProduct
};