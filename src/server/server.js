import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import dotenv from 'dotenv'

import createGame from './game.js'
dotenv.config()

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('src/client'))

const game = createGame(20, 20)
game.subscribe((command) => {
  sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
  const playerId = socket.id
  const connectionsCount = Object.keys(sockets.sockets.server.engine.clients).length

  {
    console.log(`\n[!CONNECTED]: id-${playerId}`)
    if (connectionsCount === 1) {
      console.log(`Total de ${connectionsCount} pessoa conectada.`)
    } else {
      console.log(`Total de ${connectionsCount} pessoas conectadas.`)
    }
  }

  game.addPlayer({ id: playerId })

  socket.emit('setup', game.state)
  socket.emit('config', game.configs)

  socket.on('move-player', (command) => {
    command.playerId = playerId
    command.type = 'move-player'

    game.movePlayer(command)
  })

  socket.on('disconnect', () => {
    {
      console.log(`\n[!DISCONNECTED]: id-${playerId}`)
      if (connectionsCount === 1) {
        console.log(`Total de ${connectionsCount} pessoa conectada.`)
      } else {
        console.log(`Total de ${connectionsCount} pessoas conectadas.`)
      }
    }

    game.removePlayer({ id: playerId })
  })
})

server.listen(process.env.PORT, () => {
  console.log(`> Server listening port ${process.env.PORT}`)
})
