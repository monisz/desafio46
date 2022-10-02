const isAdmin = async (ctx, next) => {
    if (process.env.ADMIN === "true") await next();
    else {
        ctx.status = 403;
        ctx.body = "método no autorizado";
    }
};

module.exports = isAdmin;