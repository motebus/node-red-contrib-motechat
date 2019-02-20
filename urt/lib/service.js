const service = {
    'mms': require('./mms'),
    'ddn': require('./ddn'),
    'ss': require('./ss'),
    'mqtt': require('./mqtt'),
    'mail': require('./mail'),
    'sms': require('./sms'),
    'ping': require('./ping'),
    'tg': require('./tg')
}

// context: node-red context data object
module.exports = async (context, topic, to, payload) => {
    if(!service[topic]) {
        throw new Error('no such topic')
    }
    return await service[topic](to, payload, context)
}