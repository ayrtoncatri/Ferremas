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

// Configuración de multer para la subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

  const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  const parsedPrice = JSON.parse(price);

  const newProduct = {
    productCode,
    brand,
    code,
    name,
    price: parsedPrice,
    image: imageUrl
  };

  productModel.createProduct(newProduct, (err, id) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ id, message: 'Producto creado correctamente', imageUrl });
  });
});

// Endpoint para subir imágenes y crear un producto

// app.post('/api/productos', upload.single('imagen'), (req, res) => {
//   const { productCode, brand, code, name, price } = req.body;

//   if (!req.file) {
//     return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
//   }

//   const imagenPath = `uploads/${req.file.filename}`;
//   const parsedPrice = JSON.parse(price);

//   const newProduct = {
//     productCode,
//     brand,
//     code,
//     name,
//     price: parsedPrice,
//     image: imagenPath
//   };

//   productModel.createProduct(newProduct, (err, id) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     res.status(201).json({ id, message: 'Producto creado correctamente', imagenPath });
//   });
// });

app.post('/products', upload.single('image'), (req, res) => {
  const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  const { productCode, name, brand, price, code } = req.body;
  const parsedPrice = JSON.parse(price);

  const newProduct = {
    productCode,
    name,
    brand,
    price: parsedPrice,
    code,
    image: imageUrl
  };

  productModel.createProduct(newProduct, (err, id) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id, imageUrl });
    }
  });
});


// Endpoint para subir imágenes y actualizar un producto
app.post('/products/:id/upload', upload.single('image'), (req, res) => {
  const productoId = req.params.id;
  const { productCode, brand, code, name, price } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
  }

  const imagenPath = `uploads/${req.file.filename}`;
  const parsedPrice = JSON.parse(price);

  db.run('UPDATE products SET productCode = ?, brand = ?, code = ?, name = ?, price = ?, image = ? WHERE id = ?', 
         [productCode, brand, code, name, parsedPrice, imagenPath, productoId], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: 'Producto actualizado correctamente', imagenPath });
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
