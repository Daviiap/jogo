export default function renderScreen(screen, game, requestAnimationFrame) {
  const context = screen.getContext("2d")

  context.fillStyle = "white"
  context.clearRect(0, 0, screen.width, screen.height)

  const gameState = game.state

  for (const fruitId in gameState.fruits) {
    const fruit = gameState.fruits[fruitId]
    context.fillStyle = 'green'
    context.fillRect(fruit.x, fruit.y, 1, 1)
  }

  for (const playerId in gameState.players) {
    const player = gameState.players[playerId]

    if (playerId === localStorage.getItem('player')) {
      context.fillStyle = 'blue'
    } else {
      context.fillStyle = "black"
    }
    context.fillRect(player.x, player.y, 1, 1)
  }

  requestAnimationFrame(() => {
    renderScreen(screen, game, requestAnimationFrame)
  })
}