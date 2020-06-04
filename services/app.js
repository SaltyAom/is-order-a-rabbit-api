const app = require("fastify")()

app.register(require("fastify-compress"))
app.register(require("fastify-caching"))
app.register(require('fastify-cors'))

process.on('SIGINT', async () => {
    await app.close();
    process.exit(0);
});

module.exports = app