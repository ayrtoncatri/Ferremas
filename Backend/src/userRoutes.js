const express = require('express');
const router = express.Router();
const userModel = require('./userModel')
const authenticate = require('./middleware/authenticate');

// Obtener todos los usuarios (solo para administradores)
router.get('/', authenticate, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  userModel.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(users);
  });
});

// Crear un nuevo usuario (solo para administradores)
router.post('/', authenticate, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  const { username, password, name, rut, role } = req.body;
  userModel.registerUser(username, password, name, rut, role, (err, userId) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Usuario creado exitosamente', userId });
  });
});

// Actualizar un usuario (solo para administradores)
router.put('/:id', authenticate, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  const { id } = req.params;
  const { name, rut, role } = req.body;
  userModel.updateUser(id, { name, rut, role }, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  });
});

// Eliminar un usuario (solo para administradores)
router.delete('/:id', authenticate, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  const { id } = req.params;
  userModel.deleteUser(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  });
});

module.exports = router;