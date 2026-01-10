const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { PORT, CORS_ORIGIN } = require('./config/env');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes will be added here
app.get('/', (req, res) => {
  res.json({ message: 'HonesTech API Server Running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});