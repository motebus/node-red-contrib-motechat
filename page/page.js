const path = require('path')
module.exports = (RED) => {

    function page(config){
        RED.nodes.createNode(this, config)
        const node = this
        const { path: jsPath } = config
        const correctPath = path.isAbsolute(jsPath) ?
            jsPath : path.resolve(jsPath)

        node.on('input', msg => {
            try {
                const exec = require(correctPath)
                if (typeof exec !== 'function') {
                    console.log('NOT_FUNCTION')
                    node.error('NOT_FUNCTION')
                    return
                }
                node.send(exec(msg))
            } catch(err) { node.error('REQUIRE_FAIL', err) }
        })
    }
    RED.nodes.registerType("page", page)
}
