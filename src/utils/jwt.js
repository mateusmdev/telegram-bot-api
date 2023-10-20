const jwt = require('jsonwebtoken')

class Jwt {
    constructor(){
        this._instance
    }

    static get instance(){
        if (!this._instance) this._instance = new Jwt()
        return this._instance
    }

    generateToken(dataObject, expiresObject = {}) {
        const isEmpty = JSON.stringify(expiresObject) === '{}'

        if (isEmpty) expiresObject = {
            expiresIn: (60 * 60)
        }

        return jwt.sign(dataObject, process.env.SECRET_JWT, expiresObject)
    }

    async decodeToken(token) {
        return new Promise(function (resolve, reject) {
            jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
                if (err) reject(err)

                //const { dataObject } = decoded
                resolve(decoded)
            })
        })
    }

    async authorization(req, res, next) {
        let token

        const isValidUser = req.headers.authorization && req.headers.authorization.startsWith('Bearer')
        if (isValidUser) {
            try {
                token = req.headers.authorization.split(' ')[1]
                const decoded = await this.decodeToken(token)
                req.jwtData = decoded
                next()
            } catch (error) {
                res.status(401).json({
                    message: 'Not authorized',
                    status: 401
                })
            }
        }

        if (!token) {
            res.status(401).json({
                message: 'Not authorized, no token',
                status: 401
            })
        }
    }
}

module.exports = Jwt.instance