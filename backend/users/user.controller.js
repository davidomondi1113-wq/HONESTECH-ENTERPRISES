const mongoose = require('mongoose');
const User = require('./user.model');

// Mock users data for when MongoDB is not connected
const mockUsers = [
  {
    id: '1',
    email: 'admin@honestech.com',
    role: 'admin',
    profile: { firstName: 'Admin', lastName: 'User' },
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '2',
    email: 'customer@example.com',
    role: 'customer',
    profile: { firstName: 'John', lastName: 'Doe' },
    isActive: true,
    createdAt: new Date()
  }
];

const getAllUsers = async (req, res) => {
  try {
    // Use mock data if MongoDB not connected
    if (!mongoose.connection.readyState) {
      return res.json(mockUsers);
    }
    
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.connection.readyState) {
      const user = mockUsers.find(u => u.id === id);
      return user ? res.json(user) : res.status(404).json({ error: 'User not found' });
    }
    
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    
    if (!mongoose.connection.readyState) {
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date()
      };
      mockUsers.push(newUser);
      return res.status(201).json(newUser);
    }
    
    const user = new User(userData);
    await user.save();
    
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (!mongoose.connection.readyState) {
      const userIndex = mockUsers.findIndex(u => u.id === id);
      if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
      
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
      return res.json(mockUsers[userIndex]);
    }
    
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.connection.readyState) {
      const userIndex = mockUsers.findIndex(u => u.id === id);
      if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
      
      mockUsers.splice(userIndex, 1);
      return res.json({ message: 'User deleted successfully' });
    }
    
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};