const db = require('./database');

function createCart(userId, callback) {
  const query = `INSERT INTO carts (userId, status) VALUES (?, 'open')`;
  db.run(query, [userId], function (err) {
    callback(err, this.lastID);
  });
}

function addToCart(userId, productId, quantity, callback) {
  const query = `INSERT INTO cartItems (cartId, productId, quantity) VALUES (
    (SELECT id FROM carts WHERE userId = ? AND status = 'open'),
    ?, ?
  )`;
  db.run(query, [userId, productId, quantity], function (err) {
    callback(err, this.lastID);
  });
}

function getCartItems(userId, callback) {
  const query = `SELECT p.*, ci.quantity FROM products p JOIN cartItems ci ON p.id = ci.productId WHERE ci.cartId = (SELECT id FROM carts WHERE userId = ? AND status = 'open')`;
  db.all(query, [userId], (err, rows) => {
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

function removeFromCart(userId, productId, callback) {
  const query = `DELETE FROM cartItems WHERE cartId = (SELECT id FROM carts WHERE userId = ? AND status = 'open') AND productId = ?`;
  db.run(query, [userId, productId], function (err) {
    callback(err, this.changes);
  });
}

module.exports = {
  createCart,
  addToCart,
  getCartItems,
  removeFromCart
};
