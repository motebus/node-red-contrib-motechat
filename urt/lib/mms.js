const { call } = require('../../lib/mcClient')
module.exports = (to, payload) => {
    const { func, params } = payload
    return call(to, func, params)
}