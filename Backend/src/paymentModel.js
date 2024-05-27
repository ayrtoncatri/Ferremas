const db = require('./database');
const { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } = require('transbank-sdk');
const { v4: uuidv4 } = require('uuid'); // Para generar un buyOrder único

const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));

async function initiatePayment(cartId, amount, callback) {
  if (!cartId || !amount) {
    return callback(new Error('Cart ID and amount are required'));
  }

  // Generar un buyOrder único y limitar su longitud
  const buyOrder = `ferremas-${uuidv4().substring(0, 8)}`; // Limitar la longitud del UUID
  const sessionId = uuidv4(); // Generar un sessionId único
  const returnUrl = 'http://localhost:4200/payment-success'; // URL de éxito
  const cancelUrl = 'http://localhost:4200/payment-failure'; // URL de fallo

  try {
    const createResponse = await tx.create(buyOrder, sessionId, amount, returnUrl, cancelUrl);
    callback(null, createResponse);
  } catch (err) {
    callback(new Error(`Error initiating payment: ${err.message}`));
  }
}

async function confirmPayment(token, callback) {
  try {
    const commitResponse = await tx.commit(token);
    if (commitResponse.status === 'AUTHORIZED') {
      const query = `UPDATE carts SET status = 'paid' WHERE id = ?`;
      db.run(query, [commitResponse.buyOrder], function (err) {
        callback(err, commitResponse);
      });
    } else {
      callback(new Error('Payment not authorized'));
    }
  } catch (err) {
    callback(new Error(`Error confirming payment: ${err.message}`));
  }
}

function getAllOrders(callback) {
  const query = 'SELECT * FROM orders';
  db.all(query, [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
}

module.exports = {
  initiatePayment,
  confirmPayment,
  getAllOrders
};

