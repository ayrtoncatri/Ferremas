const db = require('./database');

function createProduct(product, callback) {
  const query = `INSERT INTO products (productCode, brand, code, name, price, image) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    product["Código del producto"],
    product["Marca"],
    product["Código"],
    product["Nombre"],
    JSON.stringify(product["Precio"]),
    product["image"]
  ];
  db.run(query, params, function (err) {
    callback(err, this.lastID);
  });
}

function getAllProducts(callback) {
  const query = `SELECT * FROM products`;
  db.all(query, [], (err, rows) => {
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

// function getAllProducts(callback) {
//   const query = `SELECT * FROM products`;
//   db.all(query, [], (err, rows) => {
//     // Convertir el campo price de JSON a objeto
//     if (!err) {
//       rows = rows.map(row => {
//         row.price = JSON.parse(row.price);
//         return row;
//       });
//     }
//     callback(err, rows);
//   });
// }

function getProductByCode(productCode, callback) {
  const query = `SELECT * FROM products WHERE productCode = ?`;
  db.get(query, [productCode], (err, row) => {
    if (row) {
      row.price = JSON.parse(row.price);
      if (row.image) {
        row.image = `data:image/jpeg;base64,${row.image.toString('base64')}`;
      }
    }
    callback(err, row);
  });
}

// function getProductByCode(productCode, callback) {
//   const query = `SELECT * FROM products WHERE productCode = ?`;
//   db.get(query, [productCode], (err, row) => {
//     if (row) {
//       row.price = JSON.parse(row.price);
//     }
//     callback(err, row);
//   });
// }

function updateProduct(productCode, product, callback) {
  const query = `UPDATE products SET brand = ?, code = ?, name = ?, price = ? WHERE productCode = ?`;
  const params = [
    product["Marca"],
    product["Código"],
    product["Nombre"],
    JSON.stringify(product["Precio"]),
    productCode
  ];
  db.run(query, params, function (err) {
    callback(err, this.changes);
  });
}

function deleteProduct(productCode, callback) {
  const query = `DELETE FROM products WHERE productCode = ?`;
  db.run(query, [productCode], function (err) {
    callback(err, this.changes);
  });
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductByCode,
  updateProduct,
  deleteProduct
};
