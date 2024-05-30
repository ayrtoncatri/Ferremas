require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');


const paymentModel = require('./paymentModel');
const productRoutes = require('./productRoutes');

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

// Rutas de productos
app.use('/products', productRoutes);

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
