const router = require('koa-router');
const isAdmin = require('./middlewares/isAdmin');
const { getAllProducts, getProductById, addProduct, updateProduct, deleteProductById } = require('./controllersProducts');

const productsRouter = new router({ prefix: '/productos'});

//Vista de todos los productos
productsRouter.get('/', getAllProducts);

//Para obtener un producto según su id
productsRouter.get('/:id', getProductById);

//Para agregar un producto
productsRouter.post('/', isAdmin, addProduct);

//Recibe y actualiza un producto por id
productsRouter.put('/:id', isAdmin, updateProduct);

//Para borrar un producto según su id
productsRouter.delete('/:id', isAdmin, deleteProductById);

module.exports = { productsRouter };