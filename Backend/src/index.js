const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productModel = require('./productModel');
const multer = require('multer');
const sharp = require('sharp');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());


const storage = multer.memoryStorage(); 
const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/products', upload.single('image'), async (req, res) => {
  try {
      // Procesar y comprimir la imagen usando sharp
      const compressedImageBuffer = await sharp(req.file.buffer)
          .resize(300)  // Cambia el tamaño según sea necesario
          .jpeg({ quality: 70 })  // Ajusta la calidad según sea necesario
          .toBuffer();

      // Convertir la imagen a base64 para almacenarla en la base de datos
      const imageBase64 = compressedImageBuffer.toString('base64');

      // Crear un nuevo producto
      const newProduct = {
          "Código del producto": req.body.productCode,
          "Marca": req.body.brand,
          "Código": req.body.code,
          "Nombre": req.body.name,
          "Precio": JSON.parse(req.body.price),  // Asegúrate de enviar price como un JSON string
          "image": imageBase64
      };

      productModel.createProduct(newProduct, (err, productId) => {
          if (err) {
              return res.status(500).json({ error: 'Error al crear el producto' });
          }
          res.status(201).json({ message: 'Producto creado exitosamente', productId });
      });
  } catch (error) {
      console.error('Error procesando la imagen:', error);
      res.status(500).json({ error: 'Error procesando la imagen' });
  }
});


// app.post('/products', upload.single('image'), (req, res) => {
//   const { productCode, brand, code, name, price } = req.body;

//   if (!req.file) {
//     return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
//   }

//   // Convertir la imagen a Base64
//   const imageBase64 = req.file.buffer.toString('base64');
//   const parsedPrice = JSON.parse(price);

//   const newProduct = {
//     "Código del producto": productCode,
//     "Marca": brand,
//     "Código": code,
//     "Nombre": name,
//     "Precio": parsedPrice,
//     "image": imageBase64
//   };

//   console.log('Nuevo producto:', newProduct); 

//   productModel.createProduct(newProduct, (err, id) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     res.status(201).json({ id, message: 'Producto creado correctamente', image: imageBase64 });
//   });
// });


// app.post('/products/:id/upload', upload.single('image'), (req, res) => {
//   const productId = req.params.id;
//   const { productCode, brand, code, name, price } = req.body;

//   if (!req.file) {
//     return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
//   }

//   // Convertir la imagen a Base64
//   const imageBase64 = req.file.buffer.toString('base64');
//   const parsedPrice = JSON.parse(price);

//   const updatedProduct = {
//     "Marca": brand,
//     "Código": code,
//     "Nombre": name,
//     "Precio": parsedPrice,
//     "image": imageBase64
//   };

//   productModel.updateProduct(productId, updatedProduct, (err, changes) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     res.json({ message: 'Producto actualizado correctamente', image: imageBase64 });
//   });
// });



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
