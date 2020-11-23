import createGame from './clientGame.js'
import createKeyboardListener from './keyboardListener.js'
import createScreen from './screen.js'
import createNetword from './network.js'

const screenEl = document.getElementById('map')
const imgEl = document.getElementById('teste')

const game = createGame()
const keyBoardListener = createKeyboardListener(document)
const screen = createScreen(screenEl, imgEl, game, requestAnimationFrame)
const network = createNetword(game, keyBoardListener)

network.subscribe(screen.render)

network.start()
