const db = require('./database');
const { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } = require('transbank-sdk');

const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));

async function initiatePayment(cartId, amount, callback) {
  try {
    const createResponse = await tx.create(
      cartId,
      cartId,
      amount,
      'http://localhost:3000/payment-success',
      'http://localhost:3000/payment-failure'
    );
    callback(null, createResponse);
  } catch (err) {
    callback(err);
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
    callback(err);
  }
}

module.exports = {
  initiatePayment,
  confirmPayment
};


// const db = require('./database');
// const Transbank = require('transbank-sdk');

// const transbank = new Transbank.WebpayPlus.Transaction({
//   commerceCode: 'YOUR_COMMERCE_CODE',
//   apiKey: 'YOUR_API_KEY',
//   environment: Transbank.environments.TEST
// });

// function initiatePayment(cartId, amount, callback) {
//   transbank.createTransaction(cartId, amount, 'http://localhost:3000/payment-success', 'http://localhost:3000/payment-failure')
//     .then(response => {
//       callback(null, response);
//     })
//     .catch(err => {
//       callback(err);
//     });
// }

// function confirmPayment(token, callback) {
//   transbank.commitTransaction(token)
//     .then(response => {
//       if (response.status === 'AUTHORIZED') {
//         const query = `UPDATE carts SET status = 'paid' WHERE id = ?`;
//         db.run(query, [response.buyOrder], function (err) {
//           callback(err, response);
//         });
//       } else {
//         callback(new Error('Payment not authorized'));
//       }
//     })
//     .catch(err => {
//       callback(err);
//     });
// }

// module.exports = {
//   initiatePayment,
//   confirmPayment
// };
