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