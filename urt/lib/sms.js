const HTTP_HOST = 'http://smexpress.mitake.com.tw:9600/'
const axios = require('axios')

module.exports = (to, payload, context) => new Promise((resolve, reject) => {
    const username = context.get('sms-user')
    const password = context.get('sms-passwd')
    const { text } = payload
    const uriText = encodeURI(text)
    const api = `${HTTP_HOST}/SmSendGet.asp?username=${username}&password=${password}&dstaddr=${to}&smbody=${uriText}&encoding=UTF8`

    axios.get(api).then(res => {
        const { data } = res
        resolve({ data, errorCode: 0, errorMsg: 'OK' })
    }).catch(err => reject({ errorCode: -1, errorMsg: err.message }))
})