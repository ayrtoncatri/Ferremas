const express = require('express');
const router = express.Router();
const productModel = require('./productModel');
const authenticate = require('./middleware/authenticate');
const multer = require('multer');


// Configuración de Multer para la carga de imágenes
const storage = multer.memoryStorage(); // Guarda los archivos en memoria
const upload = multer({ storage: storage });

// Obtener todos los productos
router.get('/', (req, res) => {
  productModel.getAllProducts((err, products) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(products);
  });
});

// Crear un nuevo producto (solo para administradores)
router.post('/', authenticate, upload.single('image'), (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  const { productCode, brand, code, name, price } = req.body;
  const imageBuffer = req.file ? req.file.buffer : null;
  const product = { productCode, brand, code, name, price: JSON.parse(price), image: imageBuffer };

  productModel.createProductWithImage(product, imageBuffer, (err, productId) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Producto creado exitosamente', productId });
  });
});

// Actualizar un producto (solo para administradores)
router.put('/:id', authenticate, upload.single('image'), (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  const { id } = req.params;
  const { productCode, brand, code, name, price } = req.body;
  const imageBuffer = req.file ? req.file.buffer : null;
  const product = { productCode, brand, code, name, price: JSON.parse(price), image: imageBuffer };

  productModel.updateProduct(id, product, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (changes === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto actualizado exitosamente' });
  });
});

// Eliminar un producto (solo para administradores)
router.delete('/:productCode', authenticate, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });

  }
  const { productCode } = req.params;

  productModel.deleteProduct(productCode, (err, changes) => {

    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (changes === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  });
});

module.exports = router;