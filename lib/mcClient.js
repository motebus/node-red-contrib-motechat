'use strict'
const mchat = require('motechat')
const { EventEmitter } = require('events')

let config = require('./config.js')
let mcState = false
//let trigger = new EventEmitter()
let mcEvent = new EventEmitter()
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
        if (regData.ErrCode != 0) {
            console.log('motechat reg fail')
            return
        }

        this.updateDevice(regData.result, settings.dSIM)
        this.setEiInfo(regData.result, settings)

        mchat.OnEvent('message', (ch, inctl, data, cb) => {
            /*
            let obj = data
            console.log(typeof data)
            if (typeof data == 'string') {
                try {
                    obj = JSON.parse(data)
                } catch (err) {
                    cb({ ErrCode: 0, ErrMsg: 'OK' })
                    return
                }
            }

            if (!obj.triggerID) {
                cb({ ErrCode: 0, ErrMsg: 'OK' })
                return
            }

            trigger.emit(obj.triggerID, ch, inctl, obj)
            */
            mcEvent.emit('message',  { ch, inctl, data })
            cb({ ErrCode: 0, ErrMsg: 'OK' })
        })

        mchat.OnEvent('state', state => mcEvent.emit('state', {state}))
    }

    static getMessage(target, payload) {
        return {
            SToken: settings.dSIM.SToken,
            Topic: settings.DDN,
            To: target,
            Data: payload,
            SendTimeout: 6,
            WaitReply: 12
        }
    }

    static getRPC(target, func, payload) {
        return {
            SToken: settings.dSIM.SToken,
            To: target,
            Func: func,
            Data: payload
        }
    }

    static setEiName(name) {
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

MCClient.setup()

module.exports = {

    /**
     * @summary Send the message to the target, and return the promise of the reply
     * @function send
     * @public
     * 
     * @param {string} target  the DDN or name of the target
     * @param {*} payload      the data that send to the target
     * @param {string} name    the EiName that set to the host 
     * 
     * @returns {Promise<object>} return the send reply     
     */
    send(target, payload, name) {
        if (!mcState) {
            console.log('motechat not ready !!!')
            return
        }

        return new Promise(resolve => {
            MCClient.setEiName(name).then(res => {
                let message = MCClient.getMessage(target, payload)
                mchat.Send(message, reply => resolve(reply))
            })
        })

    },

    /**
     * @summary Call the function of the target, and then return the reply
     * @function call
     * @public
     * 
     * @param {string} target       the DDN or name of the target 
     * @param {string} func         the function name
     * @param {*} payload           the data that send to the called target
     * @param {stirng} name         the EiName that set to the host
     * 
     * @returns {Promise<object>}   return the call reply
     */
    call(target, func, payload = {}, name) {
        if (!mcState) {
            console.log('motechat not ready !!!')
            return
        }

        return new Promise(resolve => {
            MCClient.setEiName(name).then(res => {
                let xrpc = MCClient.getRPC(target, func, payload)
                mchat.Call(xrpc, reply => resolve(reply))
            })
        })
    },

    /**
     * @summary set the triggerID signal to the event emitter 
     * @function setTrigger
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
     * @function removeTrigger
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
