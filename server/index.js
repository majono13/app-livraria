const express = require('express')
const bodyParser = require('Body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const produtos_controller = require('./produtos_controller')

const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/livros', produtos_controller)


mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@person.vwrwo.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true })

app.listen(3000)