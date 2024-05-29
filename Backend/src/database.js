const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  // Función para verificar si una tabla existe
  function tableExists(tableName, callback) {
    db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [tableName], (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, !!row);
    });
  }

  // Verificar si todas las tablas existen
  const tables = ['products', 'carts', 'cartItems', 'orders', 'orderItems', 'users', 'payments'];
  let tablesExist = 0;

  tables.forEach((table, index) => {
    tableExists(table, (err, exists) => {
      if (err) {
        console.error(`Error al verificar la tabla ${table}:`, err);
        return;
      }
      if (exists) {
        tablesExist++;
      }
      if (index === tables.length - 1) {
        if (tablesExist === tables.length) {
          console.log("Todas las tablas ya existen.");
        } else {
          createTables();
        }
      }
    });
  });

  // Función para crear las tablas
  function createTables() {
    // Crear tabla de productos
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          productCode TEXT,
          brand TEXT,
          code TEXT,
          name TEXT,
          price REAL,
          image TEXT
      )
    `);

    // Crear tabla de carritos de compras
    db.run(`
      CREATE TABLE IF NOT EXISTS carts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER,
          status TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de ítems del carrito de compras
    db.run(`
      CREATE TABLE IF NOT EXISTS cartItems (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          cartId INTEGER,
          productId INTEGER,
          quantity INTEGER,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(cartId) REFERENCES carts(id),
          FOREIGN KEY(productId) REFERENCES products(id)
      )
    `);

    // Crear tabla de pedidos
    db.run(`
      CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER,
          status TEXT,
          total REAL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de ítems del pedido
    db.run(`
      CREATE TABLE IF NOT EXISTS orderItems (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          orderId INTEGER,
          productId INTEGER,
          quantity INTEGER,
          price REAL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(orderId) REFERENCES orders(id),
          FOREIGN KEY(productId) REFERENCES products(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        name TEXT,
        rut TEXT,
        role TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cartId INTEGER,
        buyOrder TEXT,
        token TEXT,
        amount REAL,
        status TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (cartId) REFERENCES carts(id)
      )
    `);

    console.log("Tablas creadas correctamente.");
  }
});

module.exports = db;


// Script solo para eliminar la tabla
// db.serialize(() =>{
//   db.run(`DROP TABLE IF EXISTS users`, function(err){
//     if (err) {
//       return console.error("Error al eliminar la tabla products:", err.message);
//     }
//     console.log('Tabla products eliminada');
//   });
// });

