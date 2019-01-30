module.exports = function (RED) {
    "use strict"
    let sender = {
        send: require('../lib/mcClient.js').send
    }
    let getDDN = require('../lib/mcClient.js').getDDN

    function send(config) {
        RED.nodes.createNode(this, config)
        let node = this

        node.topicList = (config.topic != '') ? [config.topic] : []

        node.name = config.name
        node.subject = config.subject
        node.on('input', msg => {
            console.log('node: ', node)
            console.log('send msg : ', msg)

            let tarList = node.topicList
            if (msg.topic && Array.isArray(msg.topic)) {
                tarList = msg.topic.filter(item => item != '')
                // tarList = msg.topic.map(item => ({ topic: item }))
            }

            if (msg.topic && typeof msg.topic === 'string') {
                tarList = [msg.topic]
            }

            tarList.forEach(topic => {
                sender.send(topic, msg.payload, node.name).then(reply => {
                    let newMsg = Object.assign(msg, {
                        hostDDN: getDDN(),
                        name: node.name,
                        payload: reply,
                        topic: topic,
                        subject: node.subject
                    })

                    node.send(reply[0].Reply.ErrCode == 0 ? [newMsg, null] : [null, newMsg])
                }).catch(e => console.error(e))
            })
        })
    }
    RED.nodes.registerType("send", send)
}
