const faker = require('faker');

class ProductsService {

  constructor() {
    // Array en memoria
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      })
    }
  }

  create() {

  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(product => product.id === id )
  }

  update() {

  }

  delete() {

  }
}

module.exports = ProductsService;
