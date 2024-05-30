require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');


const productModel = require('./productModel');
const paymentModel = require('./paymentModel');


const authRoutes = require('./authRoutes');
const cartRoutes = require('./cartRoutes');
const authenticate = require('./middleware/authenticate');
const userRoutes = require('./userRoutes');

const app = express();

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());



const storage = multer.memoryStorage(); 
const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas del carrito (protegidas por autenticación)
app.use('/cart', authenticate, cartRoutes);

// Rutas de usuarios (protegidas por autenticación)
app.use('/users', userRoutes);
//Enpoints de productos

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
  const newProduct = {
    productCode: req.body.productCode,
    brand: req.body.brand,
    code: req.body.code,
    name: req.body.name,
    price: JSON.parse(req.body.price) 
  };

  productModel.createProductWithImage(newProduct, req.file.buffer, (err, productId) => {
    if (err) {
      console.error('Error procesando la imagen:', err);
      return res.status(500).json({ error: 'Error procesando la imagen' });
    }
    res.status(201).json({ message: 'Producto creado exitosamente', productId });
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

// Enpoints de pago
app.get('/orders', (req, res) => {
  paymentModel.getAllOrders((err, orders) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(orders);
    }
  });
});

app.post('/payments',authenticate, (req, res) => {
  const { cartId, amount } = req.body;
  paymentModel.initiatePayment(cartId, amount, (err, response) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(response);
    }
  });
});

app.post('/payments/confirm',authenticate, (req, res) => {
  const { token } = req.body;
  paymentModel.confirmPayment(token, (err, response) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(response);
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}/`);
});
