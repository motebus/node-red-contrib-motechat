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

        // node.targetList = config.targetList
        // if (!node.targetList) {
        //     node.targetList = []
        // }

        node.on('input', msg => {

            // node.targetList.forEach(record => {
            //     let [target, func] = [
            //         record.target,
            //         record.func
            //     ]

            //     console.log(`target: ${target} , func: ${func}, payload: `, msg.payload)

            //     if (target && target != '') {
            //         caller.call(target, func, msg.payload)
            //     }
            // })

            let [target, func, name] = [
                config.target,
                config.func,
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
                    node.send(newMsg)
                })
            }
        })
    }
    RED.nodes.registerType("call", call)
}
