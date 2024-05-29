const express = require('express');
const router = express.Router();
const userModel = require('./userModel');

// Ruta para registrar un nuevo usuario
router.post('/register', (req, res) => {
  const { username, password, name, rut, role } = req.body;
  userModel.registerUser(username, password, name, rut, role, (err, userId) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Usuario registrado exitosamente', userId });
  });
});

// Ruta para iniciar sesión
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  userModel.authenticateUser(username, password, (err, data) => {
    if (err) {
      return res.status(401).json({ error: err.message });
    }
    res.status(200).json({ message: 'Inicio de sesión exitoso', user: data.user, token: data.token });
  });
});
  
module.exports = router;