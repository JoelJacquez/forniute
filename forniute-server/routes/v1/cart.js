const express = require('express');
const passport = require('passport');
const router = express.Router();

const CartService = require('../../services/cart');

// JWT strategy
require('../../utils/auth/strategies/jwt');

const cartService = new CartService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const cart = await cartService.getCart({ userId });

      res.status(200).json({
        data: cart,
        message: 'cart retrieved'
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/add-item',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { productId } = req.body;
    console.log('item to add ', productId);
    const userId = req.user.id;
    const result = await cartService.addItem({ userId, productId });
    try {
      res.status(201).json({
        data: { cartItemId: result },
        message: 'product created'
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/item/:itemId',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { itemId } = req.params;
    const userId = req.user.id;

    try {
      const result = await cartService.deleteItem({ userId, itemId });
      if(result.affectedRows >0 ){
        res.status(200).json({
          message: 'item deleted'
        });
      } else {
          res.status(404).json({
            message: 'item not found'
          });
      }
    } catch (err) {
      next(err);
    }
  }
);
















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



module.exports = router;
