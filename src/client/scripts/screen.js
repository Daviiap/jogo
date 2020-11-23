export default function createScreen(document, screenEl, ulEl, game, requestAnimationFrame) {
  const context = screenEl.getContext("2d")

  function render() {
    context.fillStyle = "#F0FFFF"
    context.clearRect(0, 0, screenEl.width, screenEl.height)

    const gameState = game.state

    screenEl.setAttribute('width', game.configs.map.width)
    screenEl.setAttribute('height', game.configs.map.height)

    ulEl.innerHTML = ''

    const playerImage = new Image()
    playerImage.src = '../assets/personagem.jpg'
    for (const playerId in gameState.players) {
      const player = gameState.players[playerId]

      const liEl = document.createElement('li')
      const playerName = document.createElement('p')
      const playerNameText = document.createTextNode(player.name)
      playerName.appendChild(playerNameText)
      const playerPoints = document.createElement('p')
      const playerPointsText = document.createTextNode(String(player.points))
      playerPoints.appendChild(playerPointsText)

      liEl.append(playerName, playerPoints)

      ulEl.appendChild(liEl)

      if (playerId === localStorage.getItem('player')) {
        context.drawImage(playerImage, player.x, player.y, 20, 20)
      } else {
        context.fillStyle = "#AAAAAA"
        context.fillRect(player.x, player.y, 20, 20)
      }
    }

    const cashewImage = new Image()
    cashewImage.src = '../assets/cashew.jpg'
    for (const cashewId in gameState.cashews) {
      const cashew = gameState.cashews[cashewId]

      context.drawImage(cashewImage, cashew.x, cashew.y, 20, 20)
    }

    requestAnimationFrame(() => {
      render(document, screenEl, ulEl, game, requestAnimationFrame)
    })
  }

  return {
    render
  }
}
