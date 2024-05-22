const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productModel = require('./productModel');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

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
  
  app.post('/products', (req, res) => {
    productModel.createProduct(req.body, (err, id) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id });
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
    console.log(`Server corriendo en http://localhost:${PORT}/api/message`);
});