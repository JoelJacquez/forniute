const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const productsV1Router = require('./routes/v1/products');

// app
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 9000;

// middlewares
app.use(bodyParser.json());

// default response
app.get('/', (req, res) => {
  res.status(200).send('Hello forniute');
});

// routes
app.use('/v1/products', productsV1Router);


server.listen(port, () => {
  const environment = (process.env.NODE_ENV || 'develop');

  console.log('Servidor ' + environment + ' corriendo en http://localhost:' + port);
});

module.exports = app; // for testing