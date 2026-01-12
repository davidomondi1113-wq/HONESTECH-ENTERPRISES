const mongoose = require('mongoose');
const Document = require('./document.model');
const pdfGenerator = require('./pdf.generator');

const mockDocuments = [
  {
    id: '1',
    documentNumber: 'INV-1234567890-ABC1',
    type: 'invoice',
    title: 'Invoice for Dell OptiPlex Purchase',
    customerId: '2',
    transactionId: '1',
    content: {
      items: [{
        description: 'Dell OptiPlex 7090',
        quantity: 1,
        unitPrice: 899,
        totalPrice: 899
      }],
      subtotal: 899,
      tax: 89.9,
      total: 988.9
    },
    status: 'sent',
    generatedBy: '1',
    createdAt: new Date()
  }
];

const getAllDocuments = async (req, res) => {
  try {
    const { type, status } = req.query;
    
    if (!mongoose.connection.readyState) {
      let filtered = mockDocuments;
      if (type) filtered = filtered.filter(d => d.type === type);
      if (status) filtered = filtered.filter(d => d.status === status);
      return res.json(filtered);
    }
    
    const filter = { isActive: true };
    if (type) filter.type = type;
    if (status) filter.status = status;
    
    const documents = await Document.find(filter)
      .populate('customerId', 'email profile')
      .populate('generatedBy', 'email profile')
      .sort({ createdAt: -1 });
    
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.connection.readyState) {
      const document = mockDocuments.find(d => d.id === id);
      return document ? res.json(document) : res.status(404).json({ error: 'Document not found' });
    }
    
    const document = await Document.findById(id)
      .populate('customerId', 'email profile')
      .populate('transactionId')
      .populate('generatedBy', 'email profile');
    
    if (!document) return res.status(404).json({ error: 'Document not found' });
    
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDocument = async (req, res) => {
  try {
    const documentData = {
      ...req.body,
      generatedBy: req.user.userId
    };
    
    if (!mongoose.connection.readyState) {
      const newDocument = {
        id: Date.now().toString(),
        documentNumber: `${documentData.type.toUpperCase().substr(0, 3)}-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        ...documentData,
        createdAt: new Date()
      };
      mockDocuments.push(newDocument);
      return res.status(201).json(newDocument);
    }
    
    const document = new Document(documentData);
    await document.save();
    
    const populatedDocument = await Document.findById(document._id)
      .populate('customerId', 'email profile')
      .populate('generatedBy', 'email profile');
    
    res.status(201).json(populatedDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (!mongoose.connection.readyState) {
      const documentIndex = mockDocuments.findIndex(d => d.id === id);
      if (documentIndex === -1) return res.status(404).json({ error: 'Document not found' });
      
      mockDocuments[documentIndex] = { ...mockDocuments[documentIndex], ...updates };
      return res.json(mockDocuments[documentIndex]);
    }
    
    const document = await Document.findByIdAndUpdate(id, updates, { new: true })
      .populate('customerId', 'email profile')
      .populate('generatedBy', 'email profile');
    
    if (!document) return res.status(404).json({ error: 'Document not found' });
    
    res.json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const generatePDF = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.connection.readyState) {
      const document = mockDocuments.find(d => d.id === id);
      if (!document) return res.status(404).json({ error: 'Document not found' });
      
      const pdfBuffer = await pdfGenerator.generateDocumentPDF(document);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${document.documentNumber}.pdf"`);
      return res.send(pdfBuffer);
    }
    
    const document = await Document.findById(id)
      .populate('customerId', 'email profile')
      .populate('transactionId');
    
    if (!document) return res.status(404).json({ error: 'Document not found' });
    
    const pdfBuffer = await pdfGenerator.generateDocumentPDF(document);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${document.documentNumber}.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocumentsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    
    if (!mongoose.connection.readyState) {
      const customerDocs = mockDocuments.filter(d => d.customerId === customerId);
      return res.json(customerDocs);
    }
    
    const documents = await Document.find({ customerId, isActive: true })
      .populate('generatedBy', 'email profile')
      .sort({ createdAt: -1 });
    
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.connection.readyState) {
      const documentIndex = mockDocuments.findIndex(d => d.id === id);
      if (documentIndex === -1) return res.status(404).json({ error: 'Document not found' });
      
      mockDocuments[documentIndex].isActive = false;
      return res.json({ message: 'Document deleted successfully' });
    }
    
    const document = await Document.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!document) return res.status(404).json({ error: 'Document not found' });
    
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  generatePDF,
  getDocumentsByCustomer,
  deleteDocument
};