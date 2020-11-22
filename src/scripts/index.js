import createGame from './game.js'
import createKeyboardListener from './keyboardListener.js'
import renderScreen from './screen.js'

const screen = document.getElementById("map")

const game = createGame(screen.width, screen.height)
const keyBoardListener = createKeyboardListener(document)

const socket = io()

socket.on('connect', () => {
  const playerId = socket.id

  keyBoardListener.setPlayerId(playerId)
  keyBoardListener.subscribe(game.movePlayer)
  keyBoardListener.subscribe((command) => {
    socket.emit('move-player', command)
  })

  localStorage.setItem('player', playerId)

  renderScreen(screen, game, requestAnimationFrame)
})

socket.on('setup', (state) => {
  game.setState(state)
})

socket.on('add-player', (command) => {
  game.addPlayer(command)
})

socket.on('remove-player', (command) => {
  game.removePlayer(command)
})

socket.on('move-player', (command) => {
  if (command.playerId !== localStorage.getItem('player')) {
    game.movePlayer(command)
  }
})