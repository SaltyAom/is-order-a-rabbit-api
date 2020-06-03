const app = require("fastify")()

app.register(require("fastify-compress"))
app.register(require("fastify-caching"))

module.exports = app