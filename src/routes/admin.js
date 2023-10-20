const express = require('express')
const router = express.Router()
//const { autorization } = require('../utils/jwtToken')

const controller = require('../controller/admin.js')

router.post('/authentication', controller.authentication)

module.exports = router