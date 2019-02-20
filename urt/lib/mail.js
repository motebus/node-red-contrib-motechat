const nodemailer = require('nodemailer')
const service = 'gmail'

module.exports = (to, payload, context) => new Promise((resolve, reject) => {
    // stmpAuth 
    // {
    //     user: 'yourmail@gmail.com',
    //     pass: 'yourpassword'
    // }
    const auth = context.get('stmpAuth')
    const transporter = nodemailer.createTransport({ service, auth })
    const { subject, text } = payload
    const mailOptions = {
        from: auth.user,
        to, subject, text
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) reject({
            errorCode: -1,
            errorMsg: err.message
        })
        resolve({
            data: info,
            errorCode: 0,
            errorMsg: 'OK'
        })
    })
})