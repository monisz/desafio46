const { ProductDaoFactory } = require("./productDaoFactory");
const { Product } = require("./product");
const argsparse = require('../../utils/argsparse');
 
const daoFactory = new ProductDaoFactory();
const persistenceType = argsparse.persistenceType;

class ProductService {
    constructor() {
        this.dao = daoFactory.create(persistenceType);
    }

    async getListProducts () {
        return await this.dao.getProducts();
    }

    //Para agregar un producto
    async addProductToList (newProduct) {
        newProduct.timestamp = Date.now();
        const { title, description, code, thumbnail, price, stock, timestamp } = newProduct;
        const newProd = new Product(title, description, code, thumbnail, price, stock, timestamp);
        return await this.dao.saveProduct(newProd);
    }

    //Recibe y actualiza un producto por id
    async replaceProduct (id, newData) {
        const { title, description, code, thumbnail, price, stock, timestamp } = newData;
        const modifiedProduct = new Product(title, description, code, thumbnail, price, stock, timestamp);
        return await this.dao.updateById(id, modifiedProduct);
    }

    //Para obtener un producto según su id
    async getProduct (id) {
        return await this.dao.getProductById(id);
    }

    //Para borrar un producto según el id
    async deleteProduct (id) {
        //Para poder devolver el producto completo
        const productFinded = await this.dao.getProductById(id);
        const result = await this.dao.deleteProductById(id);
        if (result == 0) return null;
        else return productFinded;
    }
}

module.exports = { ProductService };