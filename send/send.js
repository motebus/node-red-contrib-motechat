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
            if (msg.dest) {
                tarList = node.targetList.concat(
                    msg.dest.map(item => ({ target: item }))
                )

                console.log('tarList', tarList)
            }


            tarList.forEach(record => {
                let target = record.target
                console.log('target : ', target)
                console.log('msg : ', msg.payload)
                if (target && target != '') {
                    // sender.send(target, msg.payload, node.name, reply => {
                    //     let newMsg = {
                    //         payload: reply,
                    //         target: target,
                    //         subject: node.subject
                    //     }
                    //     node.send(newMsg)
                    // })

                    sender.send(target, msg.payload, node.name).then(reply => {
                        let newMsg = {
                            hostDDN: getDDN(),
                            name: node.name,
                            payload: reply,
                            target: target,
                            subject: node.subject
                        }
                        node.send(newMsg)
                    })


                }
            })
        })
    }
    RED.nodes.registerType("send", send)
}
