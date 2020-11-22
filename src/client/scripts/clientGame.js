export default function createGame(width, height) {
  const state = {
    players: {},
    totalConnections: 0
  }
  const observers = []

  const configs = {
    map: {
      width,
      height
    }
  }

  function setConfigs(newConfigs) {
    Object.assign(configs, newConfigs)
  }

  function subscribe(observerFunction) {
    observers.push(observerFunction)
  }

  function notifyAll(command) {
    for (const observerFunction of observers) {
      observerFunction(command)
    }
  }

  function setState(newState) {
    Object.assign(state, newState)
  }

  function addPlayer(command) {
    const { id } = command
    let { x, y } = command

    if (!x && !y && x !== 0 && y !== 0) {
      x = Math.floor(Math.random() * configs.map.width)
      y = Math.floor(Math.random() * configs.map.height)
    }

    if (state.players[id]) {
      console.log('Já existe um jogador com este nome!')
      return
    }

    state.players[id] = { x, y }
  }

  function removePlayer(command) {
    const { id } = command
    if (state.players[id]) {
      delete state.players[id]
    }
  }

  function movePlayer(command) {
    notifyAll(command)

    const { playerId, keyPressed } = command

    const actions = {
      ArrowUp: function (player) {
        if (player.y > 0)
          player.y--
      },
      ArrowDown: function (player) {
        if (player.y < configs.map.height - 1)
          player.y++
      },
      ArrowLeft: function (player) {
        if (player.x > 0)
          player.x--
      }
      ,
      ArrowRight: function (player) {
        if (player.x < configs.map.width - 1)
          player.x++
      }
    }

    const player = state.players[playerId]
    const action = actions[keyPressed]

    if (player && action) {
      action(player)
    }
  }

  return {
    addPlayer,
    removePlayer,
    movePlayer,
    state,
    setState,
    subscribe,
    notifyAll,
    setConfigs,
    configs
  }
}
