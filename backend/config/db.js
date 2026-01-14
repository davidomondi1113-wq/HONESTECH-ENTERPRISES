const mongoose = require('mongoose');
const { DB_URI } = require('./env');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn('MongoDB not available, running without database');
    console.log('Install MongoDB or use MongoDB Atlas for database functionality');
  }
};

module.exports = connectDB;