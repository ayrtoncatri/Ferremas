const express = require('express');
const router = express.Router();
const paymentModel = require('../models/paymentModel');
const authenticate = require('../middleware/authenticate');
const transbank = require('transbank-sdk'); // Asegúrate de tener el SDK de Transbank instalado

// Iniciar pago
router.post('/initiate', authenticate, (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;
  paymentModel.initiatePayment(userId, amount, (err, paymentData) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(paymentData);
  });
});

// Confirmar pago
router.post('/confirm', authenticate, (req, res) => {
  const { token } = req.body;
  paymentModel.confirmPayment(token, (err, paymentResult) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(paymentResult);
  });
});

module.exports = router;