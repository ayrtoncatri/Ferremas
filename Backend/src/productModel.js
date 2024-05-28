const db = require('./database');
const sharp = require('sharp');

function createProduct(product, callback) {
  const query = `INSERT INTO products (productCode, brand, code, name, price, image) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    product.productCode,
    product.brand,
    product.code,
    product.name,
    JSON.stringify(product.price),
    product.image
  ];
  db.run(query, params, function (err) {
    callback(err, this.lastID);
  });
}

async function createProductWithImage(product, imageBuffer, callback) {
  try {
    // Procesar y comprimir la imagen usando sharp
    const compressedImageBuffer = await sharp(imageBuffer)
      .resize(300)  
      .jpeg({ quality: 70 })  
      .toBuffer();
    const imageBase64 = compressedImageBuffer.toString('base64');
    product.image = imageBase64;

    createProduct(product, callback);
  } catch (error) {
    callback(error);
  }
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


function updateProduct(productCode, product, callback) {
  const query = `UPDATE products SET brand = ?, code = ?, name = ?, price = ? WHERE productCode = ?`;
  const params = [
    product.brand,
    product.code,
    product.name,
    JSON.stringify(product.price),
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
  createProductWithImage,
  getAllProducts,
  getProductByCode,
  updateProduct,
  deleteProduct
};
