const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const productModel = require('./productModel');
const cartModel = require('./cartModel');
const paymentModel = require('./paymentModel');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mensaje de verificación del backend
app.get('/api/message', (req, res) => {
  res.send('Backend funcionando');
});

// Rutas de pago (sin prefijo /api)
app.get('/payment-success', (req, res) => {
  res.send('Pago realizado');
});

app.get('/payment-failure', (req, res) => {
  res.send('Pago fallido');
});

// Rutas de productos
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


app.delete('/api/products/:productCode', (req, res) => {
  console.log(`Attempting to delete product with code: ${req.params.productCode}`);
  productModel.deleteProduct(req.params.productCode, (err, changes) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ error: err.message });
    } else if (changes) {
      console.log('Product deleted successfully');
      res.json({ message: 'Producto eliminado correctamente' });
    } else {
      console.log('Product not found');
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  });
});

// Rutas de carrito de compras
app.post('/carts', (req, res) => {
  cartModel.createCart((err, cartId) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Carrito creado exitosamente', cartId });
    }
  });
});

app.post('/carts/:cartId/items', (req, res) => {
  const { productId, quantity } = req.body;
  cartModel.addToCart(req.params.cartId, productId, quantity, (err, cartItemId) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Producto añadido al carrito', cartItemId });
    }
  });
});

app.get('/carts/:cartId/items', (req, res) => {
  cartModel.getCartItems(req.params.cartId, (err, items) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(items);
    }
  });
});

app.delete('/carts/:cartId/items/:productId', (req, res) => {
  cartModel.removeFromCart(req.params.cartId, req.params.productId, (err, changes) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (changes) {
      res.json({ message: 'Producto eliminado del carrito' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }
  });
});


app.get('/orders', (req, res) => {
  paymentModel.getAllOrders((err, orders) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(orders);
    }
  });
});

app.post('/payments', (req, res) => {
  const { cartId, amount } = req.body;
  paymentModel.initiatePayment(cartId, amount, (err, response) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(response);
    }
  });
});

app.post('/payments/confirm', (req, res) => {
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
