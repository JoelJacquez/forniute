const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const productsV1Router = require('./routes/v1/products');

var port = process.env.PORT || 9000;
// app.use('/', (req, res) => {
//   res.status(200).send('Hello forniute');
// });

app.use('/v1/products', productsV1Router);

server.listen(port, function () {
  var environment = (process.env.NODE_ENV || 'develop');

  console.log('Servidor ' + environment + ' corriendo en http://localhost:' + port);
});

module.exports = app; // for testing