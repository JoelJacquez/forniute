const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products');

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

router.post('/', async (req, res, next) => {
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
});

router.put('/productId', async (req, res, next) => {
  const { productId } = req.params;
  const { body: product } = req;

  try {
    const product =  await productsService.updateProduct({ productId, product });
    
    res.status(200).json({
      data: product,
      message: 'products updated'
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/productId', async (req, res, next) => {
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
});

module.exports = router;
