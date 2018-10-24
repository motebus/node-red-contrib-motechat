const events = require('events')
const emitter = new events.EventEmitter()

module.exports = {
    on: emitter.on,
    once: emitter.once,
    emit: emitter.emit,
    removeAllListeners: emitter.removeAllListeners
}