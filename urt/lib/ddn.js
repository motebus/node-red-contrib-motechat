const { send } = require('../../lib/mcClient')
module.exports = (to, payload) => send(`ddn://${to}`, payload)