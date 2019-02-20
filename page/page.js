const path = require('path')
module.exports = (RED) => {
    
    function page(config){
        RED.nodes.createNode(this.config)
        const { path: jsPath } = config
        const correctPath = path.isAbsolute(jsPath) ? 
            jsPath : path.resolve(jsPath)
        
        const exec = require(correctPath)
        node.on('input', msg => {
            console.log(correctPath)
            if (jsPath.length == 0) return
            if (typeof exec !== 'function') return
            node.send(exec(msg))
        })
    }
    RED.nodes.registerType("page", page)
}