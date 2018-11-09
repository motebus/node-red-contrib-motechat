module.exports = function (RED) {
    "use strict"
    let { setTrigger, removeTrigger } = require('../lib/mcClient.js')

    function trigger(config) {
        RED.nodes.createNode(this, config)
        let node = this

        node.name = config.name
        node.on('input', msg => {
            node.send(msg)
        })

        let callback = (ch, inctl, data) => {
            console.log('rec data: ',callback)
            let { triggerID, dest, ...payload } = data
            let msg = {
                ch,
                ...inctl,
                trigger: triggerID,
                dest: dest,
                payload: payload
            }
            node.send(msg)
        }

        setTrigger(config.triggerID, callback)
        node.on('close', () => removeTrigger(config.triggerID, callback))
    }
    RED.nodes.registerType("trigger ", trigger)
}
