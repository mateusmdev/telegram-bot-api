const express = require('express')
const router = express.Router()
const jwt = require('./../utils/jwt')

const controller = require('../controller/chat.js')

router.get('/chat', jwt.authorization, controller.findAll)

router.post('/chat', jwt.authorization, controller.sendMessage)

module.exports = router