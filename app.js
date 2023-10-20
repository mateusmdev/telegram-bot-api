const express = require('express')
const app = express()
const cors = require('cors')
const { Telegraf } = require('telegraf')
const database = require('./src/database/database')
const firestore = require('./src/database/firestore')

const token = process.env.TELEGRAM_TOKEN
const bot = new Telegraf(token)

database.strategy = firestore

const adminRouter = require('./src/routes/admin')
const chatRouter = require('./src/routes/chat')

app.use(cors())
app.use(express.urlencoded( {extended: false} ))
app.use(express.json())

app.use('/', adminRouter)
app.use('/', chatRouter)

bot.use(async (ctx, next) => {
    const start = new Date()
    const { update } = ctx
    database.save()
    console.log(update)
    await next()
})


bot.launch()
module.exports = app