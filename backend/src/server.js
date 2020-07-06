// import express
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')

const server = express()

// conect to database mongodb
mongoose.connect('mongodb+srv://database:passwd@omnistack-lausq.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(3333)
