import createGame from './game.js'
import createKeyboardListener from './keyboardListener.js'
import renderScreen from './screen.js'

const screen = document.getElementById("map")

const game = createGame(screen.width, screen.height)
const keyBoardListener = createKeyboardListener(document)
keyBoardListener.subscribe(game.movePlayer)

renderScreen(screen, game, requestAnimationFrame)

const socket = io()

socket.on('connect', () => {
  const playerId = socket.id
  localStorage.setItem('player', playerId)
})

socket.on('setup', (state) => {
  game.state = state
})
