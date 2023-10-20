const bcrypt = require('bcrypt')

class Admin {
    async authentication(req, res) {
        try {
            console.log('Authentication')
            const hashedPassword = await bcrypt.hash(password, 10)
            req.body.password = hashedPassword

            return res.status(200).json({})
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    }
}

module.exports = new Admin()