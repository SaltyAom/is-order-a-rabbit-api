const app = require("./services/app"),
    { run } = require("./services/common")

app.register(require('./controllers/menu'))

run(app)

if(process.env.NODE_ENV = "development")
    module.exports = app