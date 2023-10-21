const database = require('./../database/database')

class Chat {
    async findAll(req, res) {
        try {
            console.log('FindAll')
            return res.status(200).json({})
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    }

    async findOne(req, res) {
        try {
            console.log('FindOne')
            return res.status(200).json({})
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    }

    async sendMessage(req, res) {
        try {
            console.log('SendMessage')
            const { text, timestamp, chatId } = req.body

            const data = {
                userData: {
                    ...chat
                },
                collectionObj: {
                    name: 'chat',
                    subcollection: {
                        isExist: true,
                        name: 'message',
                        subData: {
                            text,
                            type: 'user',
                            timestamp: date,
                        }
                    }
                }
            }

            const result = await database.save(data)
            console.log(result)
            console.log('Mensagem enviada')
            return res.status(200).json({})
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    }

    async delete(req, res) {
        try {
            console.log('Delete')
            return res.status(200).json({})
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    }
}

module.exports = new Chat()