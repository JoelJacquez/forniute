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
      if (result.affectedRows > 0) {
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

router.put(
  '/item/:itemId/subtract',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const userId = req.user.id;
    const { itemId } = req.params;

    try {
      const result = await cartService.subtractQuantityItem({ userId, itemId });
      if (result.affectedRows > 0) {
        res.status(200).json({
          message: 'item updated'
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
  '/checkout',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const userId = req.user.id;
    const result = await cartService.checkout({ userId });
    try {
      res.status(200).json({
        message: 'checkout'
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
