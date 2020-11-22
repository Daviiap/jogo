import createGame from './game.js'
import createKeyboardListener from './keyboardListener.js'
import renderScreen from './screen.js'
import createNetword from './network.js'

const screen = document.getElementById("map")

const game = createGame()
const keyBoardListener = createKeyboardListener(document)

const network = createNetword(screen, game, keyBoardListener, renderScreen)
network.connect()
network.start()