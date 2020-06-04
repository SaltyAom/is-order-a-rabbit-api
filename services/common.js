const returnSuccess = (data, reply) => {
    reply.send(returnSuccessClient(data))
}

const returnSuccessClient = (data) => JSON.parse(`{
    "success": true,
    "info": null,
    "data": ${JSON.stringify(data)}
}`)

const returnError = (reply, errorMessage = "Menu not Found") => {
    reply.send(returnErrorClient(errorMessage))
}

const returnErrorClient = (errorMessage = "Menu not Found") => JSON.parse(`{
    "success": false,
    "info": "${errorMessage}",
    "data": null
}`)


const run = async (app) => {
    try {
        await app.listen(3000)
        console.log("Listening at http://localhost:3000")
    } catch(error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = {
    returnSuccess,
    returnSuccessClient,
    returnError,
    returnErrorClient,
    run
}