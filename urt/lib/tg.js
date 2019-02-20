const TelegramBot = require('node-telegram-bot-api')
const token = '641293137:AAEMygWqGwJoomjJ5Pd5zsYE_kxeqHu-3E0'
const bot = new TelegramBot(token, { polling: false })

const sender = {
    message: bot.sendMessage,
    photo: bot.sendPhoto,
    audio: bot.sendAudio,
    location: (chatId, content, option) => bot.sendLocation(
        chatId,
        content.latitude,
        content.longitude,
        option
    ),
    video: bot.sendVideo,
    contact: (chatId, content, option) => bot.sendContact(
        chatId,
        content.phoneNumber,
        content.firstName,
        option
    )
}

module.exports = (to, payload) => {
    const { content, type, option } = payload
    const chatId = to
    return sender[type](chatId, content, option)
}