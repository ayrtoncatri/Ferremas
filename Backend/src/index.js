const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productModel = require('./productModel');
const path = require('path');
const db = require('./database');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());


const storage = multer.memoryStorage(); 
const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/message', (req, res) => {
  res.send('Backend funcionando');
});

app.get('/products', (req, res) => {
  productModel.getAllProducts((err, products) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(products);
    }
  });
});


app.post('/products', upload.single('image'), (req, res) => {
  const { productCode, brand, code, name, price } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
  }

  // Convertir la imagen a Base64
  const imageBase64 = req.file.buffer.toString('base64');
  const parsedPrice = JSON.parse(price);

  const newProduct = {
    "Código del producto": productCode,
    "Marca": brand,
    "Código": code,
    "Nombre": name,
    "Precio": parsedPrice,
    "image": imageBase64
  };

  console.log('Nuevo producto:', newProduct); // Log para depuración

  productModel.createProduct(newProduct, (err, id) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ id, message: 'Producto creado correctamente', image: imageBase64 });
  });
});


app.post('/products/:id/upload', upload.single('image'), (req, res) => {
  const productId = req.params.id;
  const { productCode, brand, code, name, price } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
  }

  // Convertir la imagen a Base64
  const imageBase64 = req.file.buffer.toString('base64');
  const parsedPrice = JSON.parse(price);

  const updatedProduct = {
    "Marca": brand,
    "Código": code,
    "Nombre": name,
    "Precio": parsedPrice,
    "image": imageBase64
  };

  productModel.updateProduct(productId, updatedProduct, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: 'Producto actualizado correctamente', image: imageBase64 });
  });
});



app.get('/products/:productCode', (req, res) => {
  productModel.getProductByCode(req.params.productCode, (err, product) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
});

app.put('/products/:productCode', (req, res) => {
  productModel.updateProduct(req.params.productCode, req.body, (err, changes) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (changes) {
      res.json({ message: 'Product updated' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
});

app.delete('/products/:productCode', (req, res) => {
  productModel.deleteProduct(req.params.productCode, (err, changes) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (changes) {
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}/`);
});
