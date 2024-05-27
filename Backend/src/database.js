const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');


db.serialize(() => {
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

  console.log("Tablas creadas correctamente.");
});

module.exports = db;
// db.serialize(() => {
//     db.run(`
//       CREATE TABLE IF NOT EXISTS products (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         productCode TEXT,
//         brand TEXT,
//         code TEXT,
//         name TEXT,
//         price TEXT,
//         image TEXT
//       )
//     `);

//     db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
//       if (err) {
//         console.error("Error al contar los productos:", err);
//         return;
//       }
  
//       if (row.count === 0) {
//         const initialData = [
//           {
//             "Código del producto": "FER-12345",
//             "Marca": "Bosch",
//             "Código": "BOS-67890",
//             "Nombre": "Taladro Percutor Bosch",
//             "Precio": [
//               {
//                 "Fecha": "2023-05-10T03:00:00.000Z",
//                 "Valor": 89090.99
//               }
//             ],
//             "image": ""
//           },
//           {
//             "Código del producto": "FER-67890",
//             "Marca": "Makita",
//             "Código": "MAK-12345",
//             "Nombre": "Taladro Inalámbrico Makita",
//             "Precio": [
//               {
//                 "Fecha": "2023-06-15T03:00:00.000Z",
//                 "Valor": 105090.99
//               }
//             ],
//             "image": ""
//           }
//         ];
  
//         initialData.forEach(product => {
//           const query = `INSERT INTO products (productCode, brand, code, name, price, image) VALUES (?, ?, ?, ?, ?, ?)`;
//           const params = [
//             product["Código del producto"],
//             product["Marca"],
//             product["Código"],
//             product["Nombre"],
//             JSON.stringify(product["Precio"]),
//             product["image"]
//           ];
//           db.run(query, params, (err) => {
//             if (err) {
//               console.error("Error al insertar producto:", err);
//             } else {
//               console.log("Producto insertado con ID:", this.lastID);
//             }
//           });
//         });
  
//         console.log("Datos iniciales insertados correctamente.");
//       } else {
//         console.log("La tabla de productos ya contiene datos, no se insertaron datos iniciales.");
//       }
//     });
//   });

//   module.exports = db;

//Script solo para eliminar la tabla
// db.serialize(() =>{
//   db.run(`DROP TABLE IF EXISTS products`, function(err){
//     if (err) {
//       return console.error("Error al eliminar la tabla products:", err.message);
//     }
//     console.log('Tabla products eliminada');
//   });
// });
  // Script para eliminar, crear y poblar la tabla
// db.serialize(() => {
//   // Eliminar la tabla si existe
//   db.run(`DROP TABLE IF EXISTS products`, function(err) {
//       if (err) {
//           return console.error("Error al eliminar la tabla products:", err.message);
//       }
//       console.log('Tabla products eliminada');

//       // Crear la nueva tabla
//       db.run(`
//           CREATE TABLE IF NOT EXISTS products (
//               id INTEGER PRIMARY KEY AUTOINCREMENT,
//               productCode TEXT,
//               brand TEXT,
//               code TEXT,
//               name TEXT,
//               price TEXT,
//               image TEXT
//           )
//       `, function(err) {
//           if (err) {
//               return console.error("Error al crear la tabla products:", err.message);
//           }
//           console.log('Tabla products creada');

//           // Insertar datos iniciales si es necesario
//           db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
//               if (err) {
//                   return console.error("Error al contar los productos:", err.message);
//               }

//               if (row.count === 0) {
//                   const initialData = [
//                       {
//                           "Código del producto": "FER-12345",
//                           "Marca": "Bosch",
//                           "Código": "BOS-67890",
//                           "Nombre": "Taladro Percutor Bosch",
//                           "Precio": [
//                               {
//                                   "Fecha": "2023-05-10T03:00:00.000Z",
//                                   "Valor": 89090.99
//                               }
//                           ],
//                           "image": ""
//                       },
//                       {
//                           "Código del producto": "FER-67890",
//                           "Marca": "Makita",
//                           "Código": "MAK-12345",
//                           "Nombre": "Taladro Inalámbrico Makita",
//                           "Precio": [
//                               {
//                                   "Fecha": "2023-06-15T03:00:00.000Z",
//                                   "Valor": 105090.99
//                               }
//                           ],
//                           "image": ""
//                       }
//                   ];

//                   initialData.forEach(product => {
//                       const query = `INSERT INTO products (productCode, brand, code, name, price, image) VALUES (?, ?, ?, ?, ?, ?)`;
//                       const params = [
//                           product["Código del producto"],
//                           product["Marca"],
//                           product["Código"],
//                           product["Nombre"],
//                           JSON.stringify(product["Precio"]),
//                           product["image"]
//                       ];
//                       db.run(query, params, (err) => {
//                           if (err) {
//                               console.error("Error al insertar producto:", err.message);
//                           } else {
//                               console.log("Producto insertado con ID:", this.lastID);
//                           }
//                       });
//                   });

//                   console.log("Datos iniciales insertados correctamente.");
//               } else {
//                   console.log("La tabla de productos ya contiene datos, no se insertaron datos iniciales.");
//               }
//           });
//       });
//   });
// });

  // function addColumnToProducts() {
  //   const query = 'ALTER TABLE products ADD COLUMN image TEXT';
  
  //   db.run(query, (err) => {
  //     if (err) {
  //       console.error('Error al agregar la columna:', err.message);
  //     } else {
  //       console.log('Columna agregada correctamente');
  //     }
  //   });
  // }


  // db.get("PRAGMA table_info(products)", (err, row) => {
    //   if (err) {
    //     console.error("Error al verificar la tabla de productos:", err);
    //     return;
    //   }

    //   const columns = Object.keys(row);
    //   if (!columns.includes('image')) {
    //     db.run('ALTER TABLE products ADD COLUMN image TEXT', (err) => {
    //       if (err) {
    //         console.error("Error al agregar la columna 'image':", err);
    //       } else {
    //         console.log("Columna 'image' agregada correctamente.");
    //       }
    //     });
    //   }
    // });