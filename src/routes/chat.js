const express = require('express')
const router = express.Router()
const jwt = require('./../utils/jwt')

const controller = require('../controller/chat.js')

router.get('/chat', jwt.authorization, controller.findAll)

router.get('/chat/:id', jwt.authorization, controller.findOne)

router.post('/chat', jwt.authorization, controller.sendMessage)
//id vai no corpo da requisicao

router.delete('/chat', jwt.authorization, controller.delete)
//id vai no corpo da requisicao

module.exports = router