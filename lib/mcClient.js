'use strict'
const mchat = require('motechat')
const os = require('os')
const { EventEmitter } = require('events')

let config = require('./config.js')
let mcState = false
let mcEvent = new EventEmitter()
mcEvent.setMaxListeners(0)
let settings = {}

class MCClient {

    static isOpen(config) {
        return new Promise(resolve => {
            mchat.Open(config, result => resolve(result.ErrCode == 0))
        })
    }

    static isReg(dSIM) {
        return new Promise(resolve => {
            mchat.Reg(dSIM, result => resolve(result))
        })
    }

    static updateDevice(result, dSIM) {
        if (dSIM.SToken != result.SToken || dSIM.EiToken != result.EiToken) {
            dSIM.SToken = result.SToken
            dSIM.EiToken = result.EiToken
        }
    }

    static setEiInfo(result, settings) {
        let { dSIM, mote } = settings

        settings.DDN = result.DDN
        mchat.Set({
            SToken: dSIM.SToken,
            EdgeInfo: {
                DDN: result.DDN,
                EiOwner: mote.EiOwner,
                EiName: mote.EiName,
                EiType: mote.EiType,
                EiTag: mote.EiTag,
                EiLoc: mote.EiLoc
            }
        }, reply => {
            console.log('EiInfo setting: ', reply)
            if (!mcState) {
                config.setDDN(settings.DDN)
                config.setMote(settings.mote)
                config.setDSIM(settings.dSIM)
                config.setConfig(settings.config)
            }

            mcState = true
        })
    }

    static async setup() {
        settings = await config.init()

        console.log(settings)
        console.log("DC env: ", process.env.DC)
        if (mcState) return
        if (!await this.isOpen(settings.config)) {
            console.log('motechat not open')
            return
        }

        let regData = await this.isReg(settings.dSIM)
        console.log('regData: ', regData)
        if (regData.ErrCode != 0) {
            console.log('motechat reg fail')
            return
        }

        this.updateDevice(regData.result, settings.dSIM)
        this.setEiInfo(regData.result, settings)

        mchat.OnEvent('message', (ch, inctl, data, cb) => {
            mcEvent.emit('message', { ch, inctl, data, mcBack: cb })
            // cb({ ErrCode: 0, ErrMsg: 'OK' })
        }, '')

        mchat.OnEvent('state', state => mcEvent.emit('state', { state }), '')
    }

    static getMessage({ Topic = '', DDN = '', Data } = {}) {
        return {
            SToken: settings.dSIM.SToken,
            Topic, DDN, Data,
            SendTimeout: 6,
            WaitReply: 12
        }
    }

    static getRPC({ Topic = '', DDN = '', Func, Data } = {}) {
        return {
            SToken: settings.dSIM.SToken,
            DDN, Topic, Func, Data
        }
    }

    static setEiName(name) {
        const { EiName } = settings.mote
        if (EiName == name) return new Promise(resolve => resolve({}))

        settings.mote.EiName = name
        let { dSIM, mote, DDN } = settings
        let info = {
            SToken: dSIM.SToken,
            EdgeInfo: {
                DDN: DDN,
                EiOwner: mote.EiOwner,
                EiName: mote.EiName,
                EiType: mote.EiType,
                EiTag: mote.EiTag,
                EiLoc: mote.EiLoc
            }
        }

        return new Promise(resolve => {
            mchat.Set(info, result => resolve(result))
        })
    }
}

// const dealTopic = (topic) => {
//     if (topic.indexOf('://') == -1) return [
//         '', topic
//     ]

//     return topic.split('://').slice(0, 2)
// }

const checkNormal = (reply) => {
    if (!Array.isArray(reply)) {
        const { ErrCode } = reply
        return ErrCode == 0
    }

    const [result] = reply
    if (result.State) {
        const { ErrCode } = result.State
        return ErrCode == 0
    }
    if (result.IN.State) {
        const { ErrCode } = result.IN.State
        return ErrCode == 0
    }
}

MCClient.setup()

module.exports = {

    /**
     * @summary Send the message to the DDN, and return the promise of the reply
     * @function send
     * @public
     * 
     * @param {string} topic   the topic
     * @param {string} DDN     the DDN
     * @param {*} payload      the data that send to the DDN 
     * 
     * @returns {Promise<object>} return the send reply     
     */
    send(topic, DDN, payload) {
        return new Promise((resolve, reject) => {
            const message = MCClient.getMessage({
                Topic: topic, DDN, Data: payload
            })
            mchat.Send(message, reply => {
                const isNormal = checkNormal(reply)
                if (!isNormal) reject(reply)
                resolve(reply)
            })
        })
    },

    /**
     * @summary Call the function of the DDN, and then return the reply
     * @function call
     * @public
     * 
     * @param {stirng} topic         the topic
     * @param {string} DDN          the DDN
     * @param {string} func         the function name
     * @param {*} payload           the data that send to the called topic
     * 
     * @returns {Promise<object>}   return the call reply
     */
    call(topic, DDN, func, payload = {}) {
        return new Promise((resolve, reject) => {
            let xrpc = MCClient.getRPC({
                Topic: topic, DDN, Func: func, Data: payload
            })
            mchat.Call(xrpc, reply => {
                const isNormal = checkNormal(reply)
                if (!isNormal) reject(reply)
                resolve(reply)
            })
        })
    },

    /**
     * @summary set the triggerID signal to the event emitter 
     * @function setEvent
     * @public
     *
     * @param {string} event           the event signal 
     * @param {function} callback   the event callback fucntion
     */
    setEvent(event, callback) {
        if (event !== "message" && event !== "status") return
        console.log("setting event")
        mcEvent.on(event, callback)
        console.log(mcEvent)
    },


    /**
     * @summary remove the event listener from the event emitter
     * @function removeEvent
     * @public
     * 
     * @param {string} event        the event signal that removed from the event emitter
     * @param {function} callback   the event callback that removed
     */
    removeEvent(event, callback) {
        mcEvent.removeListener(event, callback)
    },

    getDDN() {
        return settings.DDN
    }
}
