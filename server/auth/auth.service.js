const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE, BCRYPT_ROUNDS } = require('../config/env');

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

const login = async (email, password) => {
  // Mock user for now - replace with database query when MongoDB is connected
  const mockUser = {
    id: '1',
    email: 'admin@honestech.com',
    password: await bcrypt.hash('admin123', BCRYPT_ROUNDS),
    role: 'admin'
  };

  if (email !== mockUser.email) {
    throw new Error('Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, mockUser.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(mockUser.id, mockUser.role);
  
  return {
    token,
    user: {
      id: mockUser.id,
      email: mockUser.email,
      role: mockUser.role
    }
  };
};

const register = async (userData) => {
  const { email, password, role = 'customer' } = userData;
  
  const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
  
  // Mock registration - replace with database save when MongoDB is connected
  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
    role
  };

  const token = generateToken(newUser.id, newUser.role);
  
  return {
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role
    }
  };
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { login, register, verifyToken };