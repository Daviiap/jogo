export default function createNetwork(screen, game, keyBoardListener, renderScreen) {
  const socket = io()

  const functions = {
    connect: () => {
      const playerId = socket.id
      localStorage.setItem('player', playerId)

      keyBoardListener.clearObservers()
      keyBoardListener.setPlayerId(playerId)
      keyBoardListener.subscribe(game.movePlayer)
      keyBoardListener.subscribe((command) => {
        socket.emit('move-player', command)
      })

      renderScreen(screen, game, requestAnimationFrame)
    },
    config: (configs) => {
      game.setConfigs(configs)

      screen.setAttribute('width', configs.map.width)
      screen.setAttribute('height', configs.map.height)
    },
    setup: (state) => {
      game.setState(state)
    },
    'add-player': (command) => {
      game.addPlayer(command)
    },
    'remove-player': (command) => {
      game.removePlayer(command)
    },
    'move-player': (command) => {
      if (command.playerId !== localStorage.getItem('player')) {
        game.movePlayer(command)
      }
    }
  }

  function start() {
    socket.on('connect', functions.connect)
    socket.on('config', functions.config)
    socket.on('setup', functions.setup)
    socket.on('add-player', functions['add-player'])
    socket.on('remove-player', functions['remove-player'])
    socket.on('move-player', functions['move-player'])
  }

  return {
    start
  }
}