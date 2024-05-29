const db = require('./database');
const { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } = require('transbank-sdk');
const { v4: uuidv4 } = require('uuid'); // Para generar un buyOrder único


const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));

async function initiatePayment(cartId, amount, callback) {
  const buyOrder = `ferremas-${uuidv4().substring(0, 8)}`; 
  const sessionId = uuidv4();
  const returnUrl = 'http://localhost:3000/payments/confirm';

  try {
    const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
    const query = `INSERT INTO payments (cartId, buyOrder, token, amount, status) VALUES (?, ?, ?, ?, 'pending')`;
    db.run(query, [cartId, buyOrder, response.token, amount], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, response);
    });
  } catch (err) {
    callback(err);
  }
}

async function confirmPayment(token, callback) {
  try {
    const response = await tx.commit(token);
    const query = `UPDATE payments SET status = 'paid' WHERE token = ?`;
    db.run(query, [token], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, response);
    });
  } catch (err) {
    callback(err);
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

