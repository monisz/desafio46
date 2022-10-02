const { ProductService } = require(`./serviceProducts`);

const productService = new ProductService();

//Vista de todos los productos
const getAllProducts = async (ctx) => {
    const allProducts = await productService.getListProducts();
    const products = productsToShow(allProducts);
    const admin = process.env.ADMIN;
    await ctx.render('products', {products, admin});
};


//Para obtener un producto según su id
const getProductById = async (ctx) => {
    const id = parseInt(ctx.params.id);
    if (isNaN(id)) return res.status(400).send({error: "el parámetro no es un número"});
    const productFinded = await productService.getProduct(id);
    if (!productFinded) {
        ctx.status=404
        ctx.body= { error: "producto no encontrado" };
    }
    else {
        await ctx.render('productsById', {productFinded});
    }
};


//Para agregar un producto
const addProduct = (ctx) => {
    const newProduct = ctx.request.body;
    const newId = productService.addProductToList(newProduct);
    ctx.body= newProduct;
}

//Recibe y actualiza un producto por id
const updateProduct = async (ctx) => {
    const id = ctx.params.id;
    const newData = ctx.request.body;
    const updatedProduct = await productService.replaceProduct(id, newData);
    if (!updatedProduct) {
        ctx.status = 404;
        ctx.body = { error: "producto no encontrado"};
    } else {
        ctx.status = 200;
        ctx.body = updatedProduct;
    }
};

//Para borrar un producto según el id
const deleteProductById = async (ctx) => {
    const id = ctx.params.id;
    const productDeleted = await productService.deleteProduct(id);
    if (!productDeleted) {
        ctx.status = 404;
        ctx.body = { error: "producto no encontrado"};
    } else {
        ctx.status = 200;
        ctx.body = productDeleted;
    }
};

const productsToShow = (items) => {
    let products = [];
    items.forEach(element => {
        products.push(
            {
                id: element.id,
                code: element.code,
                title: element.title,
                price: element.price,
                thumbnail: element.thumbnail
        })
    });
    return products;
};

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProductById };