const express = require('express');
const app = express();
const faker = require('faker');
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola!, mi app esta funcinando');
});
app.get('/nuevo-end-point', (req, res) => {
  res.send('Hola!, Esta es una nueva ruta');
});
app.get('/products', (req, res) => {
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
app.get('/products/filter', (req, res) => {
  res.json('Filter endopoint');
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json([
    {
      id,
      name: 'Playera',
      price: 2100
    }
  ]);
});
/* recogemos parámetros en la url */
app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json([{
    productId,
    categoryId
  }]);
});

/* Parámetros tipo query */
app.get('/users', (req, res) => {
  const { limit, offset} = req.query;

  if (limit && offset) {
    res.json([{
      limit,
      offset
    }]);
  } else {
    res.send([{
      message: 'Falta uno o más parámetros'
    }]);
  }
});



app.listen(port, ()=> {
  console.log('App running in http://localhost:3000');
});

/* - Put con id para modificar in elemeneto
* - Deleta para elminiar un elemento */
/* PUT - Patch para actualizar  */
/* Put se hace para un elemento específico. Con Put se remplaza todo el elemento y path solo las información específica del elemento
*/
/* Post para creare */
/* Delete con ID, se puede borrar todo pero es perligroso */
