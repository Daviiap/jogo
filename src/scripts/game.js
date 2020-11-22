export default function createGame(width, height) {
  const state = {
    players: {},
    fruits: {},
    map: {
      width,
      height
    }
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
        if (player.y > 0)
          player.y--
      },
      ArrowDown: function (player) {
        if (player.y < state.map.height - 1)
          player.y++
      },
      ArrowLeft: function (player) {
        if (player.x > 0)
          player.x--
      }
      ,
      ArrowRight: function (player) {
        if (player.x < state.map.width - 1)
          player.x++
      }
    }

    const player = state.players[playerId]
    const action = actions[keyPressed]

    if (player && action) {
      action(player)
      handleCollision(playerId)
    }

    return
  }

  function handleCollision(playerId) {
    const player = state.players[playerId]
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