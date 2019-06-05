const level = require('level')
const path = require('path')
const os = require('os')
const fs = require('fs-extra')

const { userDir = '', u = '' } = require('yargs').argv
const customPath = userDir || u
const home = (() => {
    if (process.platform === 'win32') return process.env.HOMEPATH
    if (process.platform === 'linux' || process.platform === 'darwin') return process.env.HOME
})()


const dbPath = customPath
    ? path.join(customPath, '.node-red-contrib-motechat')
    : path.join(home, '.node-red', '.node-red-contrib-motechat')

fs.ensureDirSync(dbPath)

const db = level(dbPath, { valueEncoding: 'json' })

const getDDN = () => new Promise(resolve => {
    db.get('DDN', (err, value) => resolve(value))
})

const getMote = () => new Promise(resolve => {
    db.get('mote', (err, value) => resolve(value))
})

const getDSIM = () => new Promise(resolve => {
    db.get('dSIM', (err, value) => resolve(value))
})

const getConfig = () => new Promise(resolve => {
    db.get('config', (err, value) => resolve(value))
})

const setDDN = (DDN = "") => new Promise(resolve => {
    db.put('DDN', { DDN }, (err = 0) => {
        if (err) resolve(1)
        resolve(0)
    })
})

const setMote = (mote = {
    EiOwner: process.env.EI_OWNER || "",
    EiName: process.env.EI_NAME || os.hostname(),
    EiType: process.env.EI_TYPE || ".bot",
    EiTag: process.env.EI_TAG || "#bot",
    EiLoc: process.env.EI_LOC || ""
}) => new Promise(resolve => {
    db.put('mote', mote, (err = 0) => {
        if (err) resolve(1)
        resolve(0)
    })
})

const setDSIM = (dSIM = {
    SToken: "", EiToken: ""
}) => new Promise(resolve => {
    db.put('dSIM', dSIM, (err = 0) => {
        if (err) resolve(1)
        resolve(0)
    })
})

const setConfig = (config = {
    AppName: process.env.APP_NAME || os.hostname(),
    AppKey: process.env.APP_KEY || "1u6WauSf",
    DCenter: process.env.DC || "dc@dc.ypcloud.com:6789",
    UCenter: process.env.UC || "uc@uc.ypcloud.com:6789",
    IOC: process.env.IOC || "",
    MotebusGW: process.env.MOTEBUS_GATEWAY || "127.0.0.1",
    MotebusPort: process.env.MOTEBUS_PORT || 6161,
    UseWeb: "",
    WebPort: "",
    WebEntry: ""
}) => new Promise(resolve => {
    db.put('config', config, (err = 0) => {
        if (err) resolve(1)
        resolve(0)
    })
})

const init = async () => {
    let DDN = await getDDN()
    if (!DDN) setDDN()

    // let mote = await getMote()
    // if (!mote) setMote()
    setMote()

    let dSIM = await getDSIM()
    if (!dSIM) setDSIM()

    setConfig()
    // let config = await getConfig()
    // if (!config || !process.env.MOTEBUS_GATEWAY) setConfig()

    // let dcenter = process.env.DC
    // if (config && dcenter  && config.DCenter != dcenter ) {
    //     config.DCenter = dcenter
    //     console.log('DC: ', dcenter)
    //     setConfig(config)
    // }

    return {
        ...(await getDDN()),
        mote: await getMote(),
        dSIM: await getDSIM(),
        config: await getConfig()
    }
}

module.exports = {
    init, getDDN, getMote, getDSIM, getConfig,
    setDDN, setMote, setDSIM, setConfig
}
