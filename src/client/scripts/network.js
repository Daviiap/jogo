export default function createNetwork(screen, game, keyBoardListener, renderScreen) {
  const socket = io()

  function connect() {
    socket.on('connect', () => {
      const playerId = socket.id
      localStorage.setItem('player', playerId)

      keyBoardListener.clearObservers()
      keyBoardListener.setPlayerId(playerId)
      keyBoardListener.subscribe(game.movePlayer)
      keyBoardListener.subscribe((command) => {
        socket.emit('move-player', command)
      })

      renderScreen(screen, game, requestAnimationFrame)
    })
  }

  function start() {
    socket.on('config', (configs) => {
      game.setConfigs(configs)

      screen.setAttribute('width', configs.map.width)
      screen.setAttribute('height', configs.map.height)
    })

    socket.on('setup', (state) => {
      game.setState(state)
    })

    socket.on('add-player', (command) => {
      game.addPlayer(command)
    })

    socket.on('remove-player', (command) => {
      game.removePlayer(command)
    })

    socket.on('move-player', (command) => {
      if (command.playerId !== localStorage.getItem('player')) {
        game.movePlayer(command)
      }
    })
  }

  return {
    start,
    connect
  }
}