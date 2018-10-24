const events = require('events')
const flowEvent = new events.EventEmitter()

module.exports = function (RED) {
    "use strict"

    function flowOnEvent(config) {
        RED.nodes.createNode(this, config)
        let node = this
        node.name = config.name

        let defaultEventName = config.event || ''
        if (defaultEventName != '') {
            flowEvent.on(`${defaultEventName}`, (msg) => {
                node.send(msg)
            })
        }

        node.on('input', msg => {
            if (!msg.payload) return
            let { eventName } = msg.payload
            if (eventName == '') return
            flowEvent.once(`${eventName}`, (msg) => {
                node.send(msg)
            })
        })
        node.on('close', () => { flowEvent.removeAllListeners() })
    }
    RED.nodes.registerType("onEvent", flowOnEvent)

    function flowEmit(config) {
        RED.nodes.createNode(this, config)
        let node = this
        node.name = config.name

        let eventName = config.emit || ''
        node.on('input', msg => {
            if (!msg.payload) return 
            eventName = msg.payload.eventName || eventName
            if (eventName == '') return
            flowEvent.emit(eventName, msg)
            node.send({eventName, msg})
        })
    }
    RED.nodes.registerType("emit", flowEmit)
}
