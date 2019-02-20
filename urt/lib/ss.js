const { send } = require('../../lib/mcClient')
module.exports = (to, payload) => send(`ss://${to}`, payload)