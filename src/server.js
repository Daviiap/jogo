import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import dotenv from 'dotenv'

import createGame from './scripts/game.js'
dotenv.config()

const game = createGame()

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('src'))

sockets.on('connection', (socket) => {
  const playerId = socket.id
  console.log(`Player conectado com id: ${playerId}`)

  game.addPlayer({ id: playerId, x: 0, y: 0 })

  socket.emit('setup', game.state)
})

server.listen(process.env.PORT, () => {
  console.log(`> Server listening port ${process.env.PORT}`)
})
