const express = require('express');
const app = express();
const routerApi = require('./routes');
const { errorHandler, logErrors, boomErrorHandler} = require('./middleware/error.handler.js');
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola!, mi app esta funcinando');
});
app.get('/nuevo-end-point', (req, res) => {
  res.send('Hola!, Esta es una nueva ruta');
});

routerApi(app);

/* Los midleware deben ir despues del router */
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('App running in http://localhost:3000');
});

/* - Put con id para modificar in elemeneto
* - Deleta para elminiar un elemento */
/* PUT - Patch para actualizar  */
/* Put se hace para un elemento específico. Con Put se remplaza todo el elemento y path solo las información específica del elemento
*/
/* Post para creare */
/* Delete con ID, se puede borrar todo pero es perligroso */
