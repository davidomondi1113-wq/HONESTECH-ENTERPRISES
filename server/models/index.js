// Central export for all models
module.exports = {
  User: require('../users/user.model'),
  CyberProduct: require('../products/cyber/product.model'),
  GeneralProduct: require('../products/general/product.model'),
  Inventory: require('../inventory/inventory.model'),
  Transaction: require('../transactions/transaction.model'),
  Document: require('../documents/document.model')
};