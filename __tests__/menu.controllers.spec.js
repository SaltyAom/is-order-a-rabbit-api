const {
    success,
    error,
    getResponse
} = require('../services/testHelpers')

const menu = require('../order.json')

describe('[Controller] Handle success menu', () => {
    it('should [GET] / to return full order', async (done) => {
        const response = await getResponse(expect)

        expect(response).toEqual(success(menu))
        done()
    })

    it('should [GET] /:type to return orders in requested type', async (done) => {
        const response = await getResponse(expect, '/Coffee')

        expect(response).toEqual(success(menu.Coffee))
        done()
    })

    it('should [GET] /:type/:name to return requested named order', async (done) => {
        const response = await getResponse(expect, '/Coffee/Original Blend')

        const requestedMenu = menu.Coffee.find(
            ({ name: { en } }) => en == 'Original Blend'
        )

        expect(response).toEqual(success(requestedMenu))
        done()
    })
})

describe('[Controller] Handle error menu', () => {
    it('should [Get] /:type return error on invalid menu', async (done) => {
        const response = await getResponse(expect, '/Is The Order a Rabbit?', {
            shouldBeSuccess: false
        })

        expect(response).toEqual(error())
        done()
    })

    it('should [Get] /:type/:name return error on invalid menu', async (done) => {
        const response = await getResponse(
            expect,
            '/Is The Order a Rabbit/api?',
            { shouldBeSuccess: false }
        )
        expect(response).toEqual(error())

        done()
    })
})
