const authService = require('./auth.service');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

const register = async (req, res) => {
  try {
    const userData = req.body;
    const result = await authService.register(userData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, logout, register };