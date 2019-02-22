module.exports = function (RED) {
    "use strict"

    let { setEvent, removeEvent } = require('../lib/mcClient.js')
    function flowOnEvent(config) {
        RED.nodes.createNode(this, config)
        let node = this
        node.name = config.name

        let callback = msg => node.send({ ...msg })
        //let callback = msg => { console.log(msg) }
        let defaultEventName = config.event
        if (defaultEventName === 'status') {
            setEvent('status', callback)
        }

        if (defaultEventName === 'message') {
            setEvent('message', callback)
        }

        /*
        node.on('input', msg => {
            if (eventName == '') return
            flowEvent.once(`${eventName}`, (msg) => {
                node.send(msg)
            })
        })
        */
        node.on('input', node.send)
        node.on('close', () => { removeEvent(defaultEventName, callback) })
    }
    RED.nodes.registerType("onEvent", flowOnEvent)

    function flowReEvent(config) {
        RED.nodes.createNode(this, config)
        let node = this
        let { errorCode, errorMsg } = config

        node.on('input', msg => {
            if (!msg.mcBack) return
            if (typeof msg.mcBack !== 'function') return
            msg.mcBack({ errorCode, errorMsg, data: msg.payload })
        })
    }
    RED.nodes.registerType("retEvent", flowReEvent)
}
