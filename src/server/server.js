import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import dotenv from 'dotenv'
dotenv.config()

import createGame from './game.js'
import logService from './services/log.service.js'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('src/client'))

const game = createGame(10, 10)

game.subscribe((command) => {
  sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
  const playerId = socket.id
  game.addPlayer({ id: playerId })

  logService.connected(playerId)

  socket.emit('setup', game.state)
  socket.emit('config', game.configs)

  socket.on('move-player', (command) => {
    command.playerId = playerId
    command.type = 'move-player'

    game.movePlayer(command)
  })

  socket.on('disconnect', () => {
    game.removePlayer({ id: playerId })
  })
})

server.listen(process.env.PORT, () => {
  console.log(`> Server listening port ${process.env.PORT}`)
})
