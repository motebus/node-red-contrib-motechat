const mqtt = require('mqtt')
const opt = {
    clientId: 'SusanFlow3',
    keepalive: 60,
    reconnectPeriod: 5000,
    clean: true,
    protocolId: 'MQIsdp',
    protocolVersion: 3
}
const client = mqtt.connect('mqtt://mqtt.cc:1883', opt)

process.on('beforeExit', () => {
    client.end(true)
})

module.exports = (to, payload) => new Promise((resolve, reject)=>{
    client.publish(to, payload, { qos: 1 }, (err) => {
        if (err) reject({
            errorCode: -1,
            errorMsg: err.message
        })
        resolve({
            errorCode: 0,
            errorMsg: 'OK'
        })
    })
})
        
