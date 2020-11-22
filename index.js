const screen = document.getElementById("map")
const context = screen.getContext("2d")
const currentPlayer = "player1"

function createGame() {
  const state = {
    players: {},
    fruits: {}
  }

  function addPlayer(command) {
    const { x, y, id } = command

    if (state.players[id]) {
      console.log('Já existe um jogador com este nome!')
      return
    }

    state.players[id] = { x, y }
  }

  function removePlayer(id) {
    if (state.players[id]) {
      delete state.players[id]
    }
  }

  function addFruit(command) {
    const { x, y, id } = command

    if (state.fruits[id]) {
      console.log('Já existe uma fruta nesse lugar!')
      return
    }

    state.fruits[id] = { x, y }
  }

  function removeFruit(id) {
    if (state.fruits[id]) {
      delete state.fruits[id]
    }
  }

  function movePlayer(command) {
    const { playerId, keyPressed } = command

    const actions = {
      ArrowUp: function (player) {
        player.y > 0 ?
          player.y-- :
          {}
      },
      ArrowDown: function (player) {
        player.y < 19 ?
          player.y++ :
          {}
      },
      ArrowLeft: function (player) {
        player.x > 0 ?
          player.x-- :
          {}
      }
      ,
      ArrowRight: function (player) {
        player.x < 19 ?
          player.x++ :
          {}
      }
    }

    const player = state.players[playerId]
    const action = actions[keyPressed]

    if (player && action) {
      action(player)
      handleColision()
    }

    return
  }

  function handleColision() {
    const player = state.players[currentPlayer]
    for (const fruit in state.fruits) {
      const currFruit = state.fruits[fruit]

      if (currFruit.x === player.x && currFruit.y === player.y) {
        removeFruit(fruit)
      }
    }
  }

  return {
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
    movePlayer,
    state
  }
}

function createKeyboardListener() {
  const state = {
    observers: [],
  }

  function subscribe(observerFunction) {
    state.observers.push(observerFunction)
  }

  function notifyAll(command) {
    for (const observerFunction of state.observers) {
      observerFunction(command)
    }
  }

  document.addEventListener("keydown", handleKeyDown)

  function handleKeyDown(event) {
    const keyPressed = event.key

    const command = {
      playerId: currentPlayer,
      keyPressed,
    }

    notifyAll(command)
  }

  return {
    subscribe
  }
}

function renderScreen() {
  context.fillStyle = "white"
  context.clearRect(0, 0, 20, 20)

  const gameState = game.state

  for (const fruitId in gameState.fruits) {
    const fruit = gameState.fruits[fruitId]
    context.fillStyle = 'green'
    context.fillRect(fruit.x, fruit.y, 1, 1)
  }

  for (const playerId in gameState.players) {
    const player = gameState.players[playerId]
    context.fillStyle = "black"
    context.fillRect(player.x, player.y, 1, 1)
  }

  requestAnimationFrame(renderScreen)
}

const game = createGame()

game.addPlayer({ id: currentPlayer, x: 0, y: 0 })
game.addFruit({ x: 10, y: 8 })

const keyBoardListener = createKeyboardListener()
keyBoardListener.subscribe(game.movePlayer)

renderScreen()
