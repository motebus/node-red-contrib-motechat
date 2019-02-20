const { send } = require('../../lib/mcClient')

module.exports = (to, payload) => new Promise((resolve, reject) => {
    const topic = `in://${to}`
    const date = new Date()
    const startTime = date.getTime()

    send(topic, 'ping').then(() => {
        const cur = new Date()
        const endTime = cur.getTime()
        resolve(startTime - endTime)
    }).catch(err => reject(err))
})