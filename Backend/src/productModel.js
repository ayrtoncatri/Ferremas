const db = require('./database');
const sharp = require('sharp');

function createProduct(product, callback) {
  const query = `INSERT INTO products (productCode, brand, code, name, price, image, stock) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    product.productCode,
    product.brand,
    product.code,
    product.name,
    JSON.stringify(product.price),
    product.image,
    product.stock
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

    // Verificar si el productCode ya existe
    getProductByCode(product.id, (err, existingProduct) => {
      if (err) {
        return callback(err);
      }

      if (existingProduct) {
        product.stock = Number(product.stock);
        existingProduct.stock += product.stock;
        updateProduct(product.id, existingProduct, callback);
      } else {
        // Si el producto no existe, crear uno nuevo
        createProduct(product, callback);
      }
    });
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


function getProductByCode(id, callback) {
  const query = `SELECT * FROM products WHERE productCode = ?`;
  db.get(query, [id], (err, row) => {
    if (row) {
      row.price = JSON.parse(row.price);
      if (row.image) {
        row.image = `data:image/jpeg;base64,${row.image.toString('base64')}`;
      }
    }
    callback(err, row);
  });
}


function updateProduct(id, product, callback) {
  const query = `UPDATE products SET productCode = ?, brand = ?, code = ?, name = ?, price = ?, image = ?, stock = ? WHERE id = ?`;
  const params = [
    product.productCode,
    product.brand,
    product.code,
    product.name,
    JSON.stringify(product.price),
    product.image,
    product.stock,
    id
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
