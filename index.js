const cluster = require('cluster'),
    cpu = require('os').cpus().length

const app = require('./services/app'),
    { run } = require('./services/common')

app.register(require('./controllers/menu'))

if(cluster.isMaster)
    for(let process = 0; process < cpu; process++)
        cluster.fork()
else
    run(app)

if ((process.env.NODE_ENV = 'development')) module.exports = app
