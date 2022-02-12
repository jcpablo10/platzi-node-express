const express = require('express');
const ProductsService = require('../services/products.service');

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});
/* Todas los endpoints que sn específicos deben ir antes que los endpont dinámicos */
router.get('/filter', (req, res) => {
  res.json('Filter endopoint');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id)
  res.json(product);
});

router.post('/',(req, res) => {
  const body = req.body;
  res.json([{
    message: 'created',
    data: body
  }]);
})
/* Put se deben envir todos los campos, Patch, solo los que queremos actualizar */
router.patch('/:id',(req, res) => {
  const { id } = req.params
  const body = req.body;
  res.json([{
    message: 'Updated',
    data: body,
    id: id
  }]);
})

router.delete('/:id',(req, res) => {
  const { id } = req.params;
  res.json([{
    message: 'Deleted',
    id
  }]);
})

module.exports = router;
