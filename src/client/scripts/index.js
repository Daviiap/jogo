import createGame from './game.js'
import createKeyboardListener from './keyboardListener.js'
import createScreen from './screen.js'
import createNetwork from './network.js'

const screenEl = document.getElementById('map')
const ulEl = document.getElementById('score-list')

const game = createGame()
const keyBoardListener = createKeyboardListener(document)
const screen = createScreen(
  document,
  screenEl,
  ulEl,
  game,
  requestAnimationFrame
)
const network = createNetwork(game, keyBoardListener)

network.subscribe(screen.render)

network.start()
