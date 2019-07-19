const express = require('express');
const passport = require('passport');
const router = express.Router();
const ProductsService = require('../../services/products');

// JWT strategy
require('../../utils/auth/strategies/jwt');

const productsService = new ProductsService();

router.get('/', async (req, res, next) => {
  const { tags } = req.query;
  try {
    const products = await productsService.getProducts({ tags });

    res.status(200).json({
      data: products,
      message: 'products listed'
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await productsService.getProduct({ productId });

    res.status(200).json({
      data: product,
      message: 'products retrieved'
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { body: product } = req;
    try {
      const productCreated = await productsService.createProduct({ product });

      res.status(201).json({
        data: productCreated,
        message: 'product created'
      });
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { productId } = req.params;
    const { body: product } = req;

    try {
      const updatedProduct = await productsService.updateProduct({
        productId,
        product
      });

      res.status(200).json({
        data: updatedProduct,
        message: 'products updated'
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { productId } = req.params;
    try {
      const product = await productsService.deleteProduct({ productId });

      res.status(200).json({
        data: product,
        message: 'product deleted'
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
