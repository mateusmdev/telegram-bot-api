const database = require('./../database/database')

class Chat {
    async findAll(req, res) {
        try {
            const result = await database.findAll('chat')
            return res.status(200).json({
                data: result,
                status: 200
            })
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    }

    async sendMessage(req, res) {
        try {
            const { text, chatId } = req.body
            const { telegram } = req

            const isValid = !(text == undefined) && chatId
            if (!isValid) return res.status(401).json({
                message: 'The message was not sent because the body data is invalid!',
                status: 401
            })

            const data = {
                userData: null,
                collectionObj: {
                    name: 'chat',
                    primaryKey: {
                        value: chatId,
                        name: 'id'
                    },
                    subcollection: {
                        isExist: true,
                        name: 'message',
                        subData: {
                            text,
                            type: 'bot',
                            timestamp: new Date().getTime(),
                        }
                    }
                }
            }

            await database.save(data)
            await telegram.sendMessage(chatId, text)
            return res.status(201).json({
                message: 'The message was sent successfully!',
                status: 201
            })
        } catch (error) {
            return res.status(500).json({
                message: 'It was not possible to process the request',
                status: 500
            })
        }
    }
}

module.exports = new Chat()