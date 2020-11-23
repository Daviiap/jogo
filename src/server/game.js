export default function createGame(width, height) {
  const state = {
    players: {},
    cashews: {}
  }

  const configs = {
    map: {
      width,
      height
    }
  }

  const observers = []

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

  function myRandom(min, max, multiple) {
    return Math.round(Math.random() * (max - min) / multiple) * multiple + min;
  }

  function addPlayer(command) {
    const { id } = command
    let { x, y } = command

    if (!x && !y && x !== 0 && y !== 0) {
      x = myRandom(0, configs.map.width, 20)
      y = myRandom(0, configs.map.height, 20)
    }

    if (state.players[id]) {
      console.log('Já existe um jogador com este nome!')
      return
    }

    state.players[id] = { x, y, points: 0 }

    notifyAll({ type: 'add-player', id, x, y })
  }

  function removePlayer(command) {
    const { id } = command
    if (state.players[id]) {
      delete state.players[id]
    }

    notifyAll({ type: 'remove-player', id })
  }

  function addCashew() {
    const id = Math.floor(Math.random() * 1000)
    const x = myRandom(0, configs.map.width - 20, 20)
    const y = myRandom(0, configs.map.height - 20, 20)

    state.cashews[id] = { x, y }

    notifyAll({ type: 'add-cashew', id, x, y })
  }

  function removeCashew(command) {
    const { id } = command
    if (state.cashews[id]) {
      delete state.cashews[id]
    }

    notifyAll({ type: 'remove-cashew', id })

    addCashew()
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

  function start() {
    setInterval(addCashew, 2000)
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
    handleCollision,
    start,
    state,
    configs
  }
}
