export default function createGame(width, height) {
  const state = {
    players: {},
    cashews: {}
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
    const { id, name, x, y } = command

    if (state.players[id]) {
      console.log('Já existe um jogador com este nome!')
      return
    }

    state.players[id] = { x, y, name, points: 0 }
  }

  function removePlayer(command) {
    const { id } = command
    if (state.players[id]) {
      delete state.players[id]
    }
  }

  function addCashew(command) {
    const { id, x, y } = command

    state.cashews[id] = { x, y }
  }

  function removeCashew(command) {
    const { id } = command
    if (state.cashews[id]) {
      delete state.cashews[id]
    }
  }

  function movePlayer(command) {
    notifyAll(command)

    const { playerId, keyPressed } = command

    const actions = {
      ArrowUp: function (player) {
        if (player.y > 0)
          player.y -= 20
      },
      ArrowDown: function (player) {
        if (player.y < configs.map.height - 21)
          player.y += 20
      },
      ArrowLeft: function (player) {
        if (player.x > 0)
          player.x -= 20
      }
      ,
      ArrowRight: function (player) {
        if (player.x < configs.map.width - 21)
          player.x += 20
      }
    }

    const player = state.players[playerId]
    const action = actions[keyPressed]

    if (player && action) {
      action(player)
      handleCollision(playerId)
    }
  }

  function handleCollision(playerId) {
    const player = state.players[playerId]

    for (const cashewId in state.cashews) {
      const cashew = state.cashews[cashewId]
      if (cashew.x === player.x && cashew.y === player.y) {
        removeCashew({ id: cashewId })
        incrementPlayerPoints({ id: playerId })
        notifyAll({ type: 'colision', player: playerId, cashew: cashewId })
      }
    }
  }

  function incrementPlayerPoints(command) {
    const { id } = command

    state.players[id]['points']++
  }

  return {
    addPlayer,
    removePlayer,
    addCashew,
    removeCashew,
    movePlayer,
    setState,
    subscribe,
    notifyAll,
    setConfigs,
    state,
    configs
  }
}
