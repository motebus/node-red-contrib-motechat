module.exports = function (RED) {
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
        node.on('input', msg => {
            
            let DDN = msg.DDN || config.DDN 
            DDN = Array.isArray(DDN) ? DDN : [DDN]
            DDN = DDN.filter(item => item)
            let tarList = DDN
           
            tarList.forEach(target => {
                sender.send(topic, target, msg.payload).then(reply => {
                    let newMsg = Object.assign(msg, {
                        hostDDN: getDDN(),
                        name: node.name,
                        payload: reply,
                        topic: topic,
                        subject: node.subject
                    })

                    node.send([newMsg, null])
                }).catch(err => node.send([null, err]))
            })
        })
    }
    RED.nodes.registerType("send", send)
}
