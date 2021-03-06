const express = require('express');
const ProductsService = require('../services/products.service');
const validatorHandler = require('../middleware/validatorHandler');
const { getProductSchema, createProductSchema, updateProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});
/* Todas los endpoints que sn específicos deben ir antes que los endpont dinámicos */
router.get('/filter', async (req, res) => {
  await res.json('Filter endopoint');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id)
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body)
    res
      .status(201)
      .json(newProduct);
  }
)
/* Put se deben envir todos los campos, Patch, solo los que queremos actualizar */
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body;
      const product = await service.update(id, body)
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id)
    res.json(response);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
