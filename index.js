const screen = document.getElementById("map")
const context = screen.getContext("2d")
const currentPlayer = "player1"

function createGame() {
  const actions = {
    ArrowUp: function (player) {
      if (player.y > 0) {
        player.y--
      }
    },
    ArrowDown: function (player) {
      if (player.y < 19) {
        player.y++
      }
    },
    ArrowLeft: function (player) {
      if (player.x > 0) {
        player.x--
      }
    },
    ArrowRight: function (player) {
      if (player.x < 19) {
        player.x++
      }
    },
  }

  function movePlayer(command) {
    const { playerId, keyPressed } = command

    const player = state.players[playerId]
    const action = actions[keyPressed]

    if (player && action) {
      action(player)
    }

    return
  }

  const state = {
    players: {
      player1: { x: 0, y: 0 },
    },
    fruits: {
      fruit1: { x: 10, y: 10 },
    },
  }

  return {
    movePlayer,
    state,
  }
}
const game = createGame()

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
    subscribe,
  }
}
const keyBoardListener = createKeyboardListener()
keyBoardListener.subscribe(game.movePlayer)

renderScreen()

function renderScreen() {
  context.fillStyle = "white"
  context.clearRect(0, 0, 20, 20)

  const gameState = game.state

  for (const fruitId in gameState.fruits) {
    const fruit = gameState.fruits[fruitId]
    context.fillStyle = "green"
    context.fillRect(fruit.x, fruit.y, 1, 1)
  }

  for (const playerId in gameState.players) {
    const player = gameState.players[playerId]
    context.fillStyle = "black"
    context.fillRect(player.x, player.y, 1, 1)
  }

  requestAnimationFrame(renderScreen)
}
