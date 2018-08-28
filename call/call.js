module.exports = function (RED) {
    "use strict"
    //let caller = require('./lib/caller.js')
    let caller = {
        call: require('../lib/mcClient.js').call
    }
    let getDDN = require('../lib/mcClient.js').getDDN

    function call(config) {
        RED.nodes.createNode(this, config)
        let node = this

        node.on('input', msg => {
            let [target, func, name] = [
                msg.target || config.target,
                msg.func || config.func,
                config.name
            ]

            if (!name) {
                console.log('name should not be empty !!!')
                return
            }

            if (target && target != '') {
                caller.call(target, func, msg.payload, name).then(reply => {
                    let newMsg = {
                        hostDDN: getDDN(),
                        name: name,
                        payload: reply
                    }

                    node.send(!reply.Reply.ErrCode ? [newMsg, null] : [null, newMsg])
                })
            }
        })
    }
    RED.nodes.registerType("call", call)
}
