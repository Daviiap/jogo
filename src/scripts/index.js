import createGame from './game.js'
import createKeyboardListener from './keyboardListener.js'
import renderScreen from './screen.js'

const screen = document.getElementById("map")

localStorage.setItem('player', 'player1')

const game = createGame(screen.width, screen.height)
const keyBoardListener = createKeyboardListener(document)
keyBoardListener.subscribe(game.movePlayer)

game.addPlayer({ id: localStorage.getItem('player'), x: 0, y: 0 })
game.addFruit({ x: 10, y: 8 })

renderScreen(screen, game, requestAnimationFrame)
