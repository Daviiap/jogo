import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import dotenv from 'dotenv'

import createGame from './scripts/game.js'
dotenv.config()

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('src'))

const game = createGame(20, 20)
game.subscribe((command) => {
  sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
  const playerId = socket.id
  console.log(`Player conectado com id: ${playerId}`)

  game.addPlayer({ id: playerId, x: 0, y: 0 })

  socket.emit('setup', game.state)

  socket.on('disconnect', () => {
    console.log(`Player desconectado com id: ${playerId}`)

    game.removePlayer({ id: playerId })
  })
})

server.listen(process.env.PORT, () => {
  console.log(`> Server listening port ${process.env.PORT}`)
})
