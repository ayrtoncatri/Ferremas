const db = require('./database');

function createCart(callback) {
  const query = `INSERT INTO carts DEFAULT VALUES`;
  db.run(query, function (err) {
    callback(err, this.lastID);
  });
}

function addToCart(cartId, productId, quantity, callback) {
  const query = `INSERT INTO cart_items (cartId, productId, quantity) VALUES (?, ?, ?)`;
  const params = [cartId, productId, quantity];
  db.run(query, params, function (err) {
    callback(err, this.lastID);
  });
}

function getCartItems(cartId, callback) {
  const query = `SELECT p.*, ci.quantity FROM products p JOIN cart_items ci ON p.productCode = ci.productId WHERE ci.cartId = ?`;
  db.all(query, [cartId], (err, rows) => {
    if (!err) {
      rows = rows.map(row => {
        row.price = JSON.parse(row.price);
        if (row.image) {
          row.image = `data:image/jpeg;base64,${row.image.toString('base64')}`;
        }
        return row;
      });
    }
    callback(err, rows);
  });
}

function removeFromCart(cartId, productId, callback) {
  const query = `DELETE FROM cart_items WHERE cartId = ? AND productId = ?`;
  db.run(query, [cartId, productId], function (err) {
    callback(err, this.changes);
  });
}

module.exports = {
  createCart,
  addToCart,
  getCartItems,
  removeFromCart
};
