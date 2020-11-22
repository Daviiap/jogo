export default function createScreen(screenEl, playersCountEl, game, requestAnimationFrame) {
  const context = screenEl.getContext("2d")

  function render() {
    context.fillStyle = "white"
    context.clearRect(0, 0, screenEl.width, screenEl.height)

    const gameState = game.state

    playersCountEl.innerHTML = `Jogadores conectados: ${gameState.totalConnections}`

    for (const fruitId in gameState.fruits) {
      const fruit = gameState.fruits[fruitId]
      context.fillStyle = 'green'
      context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    screenEl.setAttribute('width', game.configs.map.width)
    screenEl.setAttribute('height', game.configs.map.height)

    for (const playerId in gameState.players) {
      const player = gameState.players[playerId]

      if (playerId === localStorage.getItem('player')) {
        context.fillStyle = '#FFBB00'
      } else {
        context.fillStyle = "#888888"
      }
      context.fillRect(player.x, player.y, 1, 1)
    }

    requestAnimationFrame(() => {
      render(screenEl, playersCountEl, game, requestAnimationFrame)
    })
  }

  return {
    render
  }
}
