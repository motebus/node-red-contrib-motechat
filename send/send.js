module.exports = function(RED) {
    "use strict"
    let sender = {
        send: require('../lib/mcClient.js').send
    }
    let getDDN = require('../lib/mcClient.js').getDDN

    function send(config) {
        RED.nodes.createNode(this, config)
        let node = this

        let { topic } = config
        node.name = config.name
        node.on('input', (msg, send, done) => {
            send = send || function() { node.send.apply(node, arguments) }

            let DDN = msg.DDN || config.DDN
            DDN = Array.isArray(DDN) ? DDN : [DDN]
            DDN = DDN.filter(item => item)
            let tarList = DDN
            let length = tarList.length

            tarList.forEach((target, index) => {
                sender.send(topic, target, msg.payload).then(reply => {
                    let newMsg = Object.assign(msg, {
                        hostDDN: getDDN(),
                        name: node.name,
                        payload: reply,
                        topic: topic,
                        subject: node.subject
                    })

                    send([newMsg, null])
                }).catch(err => send([null, err]))

                if (length == index && done) done()
            })
        })
    }
    RED.nodes.registerType("send", send)
}