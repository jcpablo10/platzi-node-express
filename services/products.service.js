const faker = require('faker');

class ProductsService {

  constructor() {
    // Array en memoria
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      })
    }
  }

  create( data ) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push( newProduct );
    return newProduct;
  }

  find() {
    return this.products;
  }

  findOne( id ) {
    return this.products.find(product => product.id === id )
  }

  update( id, changes ) {
    const idx = this.products.findIndex(product => product.id === id );
    if (idx === -1) {
      throw new Error('Product Not found');
    }

    const product = this.products[idx];
    this.products[idx] = {
      ...product,
      ...changes
    }

    return this.products[idx];

  }

  delete(id) {
    const idx = this.products.findIndex(product => product.id === id );
    if (idx === -1) {
      throw new Error('Product Not found');
    }

    this.products.splice(idx, 1);

    return {id};
  }
}

module.exports = ProductsService;
