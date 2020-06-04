const menu = require("../order.json"),
    menuType = Object.keys(menu)

const { returnSuccess, returnError } = require('../services/common')

const menuController = (app, _, done) => {
    app.get("/", async (_, reply) => { 
        returnSuccess(menu, reply)
    })

    app.get("/:type", async (request, reply) => {
        const type = request.params.type

        if(menuType.includes(type))
            return returnSuccess(menu[type], reply)

        returnError(reply)
    })

    app.get("/:type/:name", async (request, reply) => {
        const { type, name } = request.params

        if(!menuType.includes(type))
            return returnError(reply)
    
        const menuNameList = menu[type].map(({ name: {en} }) => en)
        if(!menuNameList.includes(name))
            return returnError(reply)

        const requestedMenu = menuNameList.indexOf(name)

        returnSuccess(menu[type][requestedMenu], reply)
    })

    done()
}

module.exports = menuController