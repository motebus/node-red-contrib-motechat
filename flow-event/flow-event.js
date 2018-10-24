module.exports = function (RED) {
    "use strict"
    let { on, once, emit, removeAllListeners } = require('../lib/flowEvent.js')

    function flowOnEvent(config) {
        RED.nodes.createNode(this, config)
        let node = this
        node.name = config.name

        let defaultEventName = node.event || ''
        if (defaultEventName != '') {
            on(defaultEventName, (msg) => {
                node.send(msg)
            })
        }

        node.on('input', msg => {
            let { eventName } = msg
            if (eventName == '') return
            once(`${eventName}`, (msg) => {
                node.send(msg)
            })
        })
        node.on('close', () => { removeAllListeners() })
    }
    RED.nodes.registerType("flowOnEvent", flowOnEvent)

    function flowEmit(config) {
        RED.nodes.createNode(this, config)
        let node = this
        node.name = config.name

        let defaultEventName = node.event || ''

        node.on('input', msg => {
            let eventName = msg.eventName || defaultEventName
            if (eventName == '') return

            emit(eventName, msg)
        })
    }
    RED.nodes.registerType("flowEmit", flowEmit)
}
