module.exports = function (RED) {
    "use strict"
    //let sender = require('./lib/sender.js')
    let sender = {
        send: require('../lib/mcClient.js').send
    }
    let getDDN = require('../lib/mcClient.js').getDDN

    function send(config) {
        RED.nodes.createNode(this, config)
        let node = this

        node.targetList = config.targetList
        if (!node.targetList) {
            node.targetList = []
        }

        node.name = config.name
        node.subject = config.subject
        node.on('input', msg => {
            console.log('send msg : ', msg)
            let tarList = node.targetList
            if (msg.targets && Array.isArray(msg.targets)) {
                tarList = msg.targets.map(item => ({ target: item }))
                // tarList = node.targetList.concat(
                //     msg.targets.map(item => ({ target: item }))
                // )
            }

            tarList.forEach(record => {
                let target = record.target
                if (target && target != '') {
                    sender.send(target, msg.payload, node.name).then(reply => {
                        let newMsg = {
                            hostDDN: getDDN(),
                            name: node.name,
                            payload: reply,
                            target: target,
                            subject: node.subject
                        }
                        
                        node.send(!reply.Reply.ErrCode ? [newMsg, null] : [null, newMsg])
                    })
                }
            })
        })
    }
    RED.nodes.registerType("send", send)
}
