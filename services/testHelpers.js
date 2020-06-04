const app = require('../index'),
    { returnSuccessClient, returnErrorClient } = require('./common')

const success = (menu) => JSON.stringify(returnSuccessClient(menu)),
    error = () => JSON.stringify(returnErrorClient())

const checkHeader = (
    expect,
    response,
    { shouldBeSuccess = true } = { shouldBeSuccess: true }
) => {
    expect(response.statusCode).toBe(200)

    if (shouldBeSuccess) expect(JSON.parse(response.payload).success).toBe(true)
    else expect(JSON.parse(response.payload).success).toBe(false)
}

const getResponse = async (expect, url = '/', headerConfig = {
    shouldBeSuccess = true
} = {
    shouldBeSuccess: true
}) => {
    let response = await app.inject({
        method: 'GET',
        url: url
    })

    checkHeader(expect, response, headerConfig)

    return response.payload
}

module.exports = {
    success,
    error,
    checkHeader,
    getResponse
}