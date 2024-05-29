const express = require('express');
const router = express.Router();
const cartModel = require('./cartModel');
const authenticate = require('./middleware/authenticate');

// Obtener el carrito del usuario
router.get('/', authenticate, (req, res) => {
  const userId = req.user.id;
  cartModel.getCartByUserId(userId, (err, cart) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(cart);
  });
});

// Agregar producto al carrito
router.post('/add', authenticate, (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  cartModel.addProductToCart(userId, productId, quantity, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Producto agregado al carrito' });
  });
});

// Eliminar producto del carrito
router.post('/remove', authenticate, (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  cartModel.removeProductFromCart(userId, productId, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Producto eliminado del carrito' });
  });
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const cartModel = require('./cartModel');
// const paymentModel = require('./paymentModel');

// // Ruta para crear un nuevo carrito
// router.post('/', (req, res) => {
//   const { userId } = req.body;
//   cartModel.createCart(userId, (err, cartId) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(201).json({ message: 'Carrito creado exitosamente', cartId });
//   });
// });

// // Ruta para agregar un producto al carrito
// router.post('/:cartId/items', (req, res) => {
//   const { cartId } = req.params;
//   const { productId, quantity } = req.body;
//   cartModel.addToCart(cartId, productId, quantity, (err, cartItemId) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(201).json({ message: 'Producto añadido al carrito', cartItemId });
//   });
// });

// // Ruta para eliminar un producto del carrito
// router.delete('/:cartId/items/:productId', (req, res) => {
//   const { cartId, productId } = req.params;
//   cartModel.removeFromCart(cartId, productId, (err, changes) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(200).json({ message: 'Producto eliminado del carrito', changes });
//   });
// });

// // Ruta para obtener los productos del carrito
// router.get('/:cartId/items', (req, res) => {
//   const { cartId } = req.params;
//   cartModel.getCartItems(cartId, (err, items) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(200).json(items);
//   });
// });

// // Ruta para pagar y guardar el pago en la base de datos
// router.post('/pay', (req, res) => {
//   const { cartId, amount } = req.body;
//   paymentModel.initiatePayment(cartId, amount, (err, response) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(201).json(response);
//   });
// });

// // Ruta para confirmar el pago
// router.post('/confirm', (req, res) => {
//   const { token } = req.body;
//   paymentModel.confirmPayment(token, (err, response) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(200).json(response);
//   });
// });

// module.exports = router;