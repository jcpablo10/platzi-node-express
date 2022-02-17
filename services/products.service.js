const faker = require('faker');
const boom = require('@hapi/boom');
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
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create( data ) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push( newProduct );
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve(this.products);
      }, 5);
    })
  }

  async findOne( id ) {
    const product = this.products.find(product => product.id === id );
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Not allowed');
    }
    return product;
  }

  async update( id, changes ) {
    const idx = this.products.findIndex(product => product.id === id );
    if (idx === -1) {
      throw boom.notFound('Product not found');
    }

    const product = this.products[idx];
    this.products[idx] = {
      ...product,
      ...changes
    }

    return this.products[idx];

  }

  async delete(id) {
    const idx = this.products.findIndex(product => product.id === id );
    if (idx === -1) {
      throw boom.notFound('Produc not found');
    }

    this.products.splice(idx, 1);

    return {id};
  }
}

module.exports = ProductsService;
