const express = require('express');
const router = express.Router();

/* recogemos parámetros en la url */
router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json([{
    productId,
    categoryId
  }]);
});

module.exports = router;
