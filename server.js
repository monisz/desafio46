require('dotenv').config();
const koa = require('koa');
const koaBody = require('koa-body');
const hbs = require('koa-views-handlebars');
const argsparse = require('./utils/argsparse');
const { productsRouter } = require('./modules/products/routerProducts');

const app = new koa();
app.use(koaBody());

app.use(hbs(__dirname + '/public/views', {
    partialsDirs: __dirname + '/public/views'
}));

app.use(productsRouter.routes());

// Para cualquier ruta no implementada
app.use((ctx) => {
    ctx.status = 404;
    ctx.body = "ruta no implementada";
});

const port = process.env.PORT || argsparse.port;

app.listen(port, () => {
    console.log(`escuchando desafio 46 en puerto ${port}`);
}); 
