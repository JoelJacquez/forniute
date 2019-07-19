const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const productsV1Router = require('./routes/v1/products');
const authV1Router = require('./routes/v1/auth');
const cartV1Router = require('./routes/v1/cart');

const {
  logErrors,
  clientErrorHandler,
  errorHandler
} = require('./utils/middlewares/errorsHandlers');

// app
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 9000;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// default response
app.get('/', (req, res) => {
  res.status(200).send('Hello forniute');
});

// routes
app.use('/v1/products', productsV1Router);
app.use('/v1/auth', authV1Router);
app.use('/v1/cart', cartV1Router);


// error handlers
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

server.listen(port, () => {
  const environment = process.env.NODE_ENV || 'develop';

  console.log(
    'Servidor ' + environment + ' corriendo en http://localhost:' + port
  );
});

module.exports = app; // for testing
