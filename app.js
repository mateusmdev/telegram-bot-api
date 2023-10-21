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
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', adminRouter)
app.use('/', chatRouter)

bot.use(async (ctx, next) => {
    const a = await database.findAll('chat/', 'first_name', '==', 'Mateus')

    const { update } = ctx
    const { chat, date, text } = update.message

    const data = {
        userData: {
            ...chat
        },
        collectionObj: {
            name: 'chat',
            primaryKey: {
                value: chat.id,
                name: 'id'
            },
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

    //const start = new Date()
    const doc = await database.save(data)
    await next()
})


bot.launch()
module.exports = app