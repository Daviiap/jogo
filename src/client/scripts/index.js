import createGame from './clientGame.js'
import createKeyboardListener from './keyboardListener.js'
import renderScreen from './screen.js'
import createNetword from './network.js'

const screenEl = document.getElementById('map')
const playersCountEl = document.getElementById('players-count')

const game = createGame()
const keyBoardListener = createKeyboardListener(document)

const network = createNetword(
  screenEl,
  game,
  keyBoardListener
)

renderScreen(screenEl, game, requestAnimationFrame)

network.start()
