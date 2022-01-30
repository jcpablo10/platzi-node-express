const express = require('express');
const faker = require('faker');
const router = express.Router();

router.get('/', (req, res) => {
  const products = []
  const { size } = req.query;
  const limit = size || 10;

  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    })
  }
  res.json(products);
});
/* Todas los endpoints que sn específicos deben ir antes que los endpont dinámicos */
router.get('/filter', (req, res) => {
  res.json('Filter endopoint');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json([
    {
      id,
      name: 'Playera',
      price: 2100
    }
  ]);
});

module.exports = router;
