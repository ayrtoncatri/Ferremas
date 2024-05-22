const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productCode TEXT,
        brand TEXT,
        code TEXT,
        name TEXT,
        price TEXT
      )
    `);
  
    // Verificar si la tabla está vacía antes de insertar datos iniciales
    db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
      if (err) {
        console.error("Error al contar los productos:", err);
        return;
      }
  
      if (row.count === 0) {
        const initialData = [
          {
            "Código del producto": "FER-12345",
            "Marca": "Bosch",
            "Código": "BOS-67890",
            "Nombre": "Taladro Percutor Bosch",
            "Precio": [
              {
                "Fecha": "2023-05-10T03:00:00.000Z",
                "Valor": 89090.99
              }
            ]
          },
          {
            "Código del producto": "FER-67890",
            "Marca": "Makita",
            "Código": "MAK-12345",
            "Nombre": "Taladro Inalámbrico Makita",
            "Precio": [
              {
                "Fecha": "2023-06-15T03:00:00.000Z",
                "Valor": 105090.99
              }
            ]
          }
        ];
  
        initialData.forEach(product => {
          const query = `INSERT INTO products (productCode, brand, code, name, price) VALUES (?, ?, ?, ?, ?)`;
          const params = [
            product["Código del producto"],
            product["Marca"],
            product["Código"],
            product["Nombre"],
            JSON.stringify(product["Precio"])
          ];
          db.run(query, params, (err) => {
            if (err) {
              console.error("Error al insertar producto:", err);
            }
          });
        });
  
        console.log("Datos iniciales insertados correctamente.");
      } else {
        console.log("La tabla de productos ya contiene datos, no se insertaron datos iniciales.");
      }
    });
  });
  
  module.exports = db;
