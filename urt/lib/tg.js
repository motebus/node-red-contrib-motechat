const TelegramBot = require('node-telegram-bot-api')
const token = '641293137:AAElcXvCTIPA7vHsTOiiallG9gt7PSfPRSo'
const bot = new TelegramBot(token, { polling: false })

const sender = {
    message: (chatId, content, option) => bot.sendMessage(chatId, content, option),
    photo: (chatId, content, option) => bot.sendPhoto(chatId, content, option),
    audio: (chatId, content, option) => bot.sendAudio(chatId, content, option),
    location: (chatId, content, option) => bot.sendLocation(
        chatId,
        content.latitude,
        content.longitude,
        option
    ),
    video: (chatId, content, option) => bot.sendVideo(chatId, content, option),
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