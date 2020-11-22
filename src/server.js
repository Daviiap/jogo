const express = require('express')
const http = require('http')
require('dotenv').config()

const app = express()
const server = http.createServer(app)

app.use(express.static('src'))

server.listen(process.env.PORT, () => {
  console.log(`> Server listening port ${process.env.PORT}`)
})
