import createGame from './clientGame.js'
import createKeyboardListener from './keyboardListener.js'
import createScreen from './screen.js'
import createNetword from './network.js'

const screenEl = document.getElementById('map')

const game = createGame()
const keyBoardListener = createKeyboardListener(document)
const screen = createScreen(screenEl, game, requestAnimationFrame)
const network = createNetword(game, keyBoardListener)

network.subscribe(screen.render)

network.start()
