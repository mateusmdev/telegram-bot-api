const bcrypt = require('bcrypt')
const database = require('../database/database')
const jwt = require('../utils/jwt')

class Admin {
    async authentication(req, res) {
        try {
            const { username, password } = req.body
            const isValid = username && password

            let result
            if (isValid) {
                [result] = await database.findAll('admin', 'username', '==', username)
            }

            if (isValid && result) {
                const compareResult = await bcrypt.compare(password, result.password)
                if (compareResult) {
                    const token = await jwt.generateToken({
                        username
                    })
                    console.log(token)

                    return res.status(201).json({
                        message: 'User has been authenticated',
                        token,
                        status: 201
                    })
                }
            }

            return res.status(401).json({
                message: "User hasn't been authenticated",
                status: 401
            })
        } catch (error) {
            return res.status(500).json({
                message: 'It was not possible to process the request',
                status: 500
            })
        }
    }
}

module.exports = new Admin()