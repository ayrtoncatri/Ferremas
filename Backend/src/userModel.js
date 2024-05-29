const bcrypt = require('bcrypt'); 
const db = require('./database'); 
const jwt = require('jsonwebtoken'); 
const secretKey = process.env.SECRET_KEY


// Función para registrar un nuevo usuario
function registerUser(username, password, name, rut, role, callback) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = `INSERT INTO users (username, password, name, rut, role) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [username, hashedPassword, name, rut, role], function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, this.lastID);
  });
}

// Función para autenticar un usuario
function authenticateUser(username, password, callback) {
  const query = `SELECT * FROM users WHERE username = ?`;
  db.get(query, [username], (err, user) => {
    if (err) {
      return callback(err);
    }
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });
      callback(null, { user, token });
    } else {
      callback(new Error('Invalid username or password'));
    }
  });
}

// Función para obtener todos los usuarios
function getAllUsers(callback) {
  const query = `SELECT * FROM users`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
}

// Función para actualizar un usuario
function updateUser(id, user, callback) {
  const query = `UPDATE users SET name = ?, rut = ?, role = ? WHERE id = ?`;
  const params = [user.name, user.rut, user.role, id];
  db.run(query, params, function(err) {
    callback(err, this.changes);
  });
}

// Función para eliminar un usuario
function deleteUser(id, callback) {
  const query = `DELETE FROM users WHERE id = ?`;
  db.run(query, [id], function(err) {
    callback(err, this.changes);
  });
}

module.exports = {
  registerUser,
  authenticateUser,
  getAllUsers,
  updateUser,
  deleteUser
};