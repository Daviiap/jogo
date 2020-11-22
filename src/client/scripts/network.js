export default function createNetwork(game, keyBoardListener) {
  const socket = io()

  const observers = []

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

      notifyAll()
    },
    config: (configs) => {
      game.setConfigs(configs)
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
    },
    colision: (command) => {
      const { player } = command
      game.removePlayer({ id: player })
    }
  }

  function subscribe(observerFunction) {
    observers.push(observerFunction)
  }

  function notifyAll(command) {
    for (const observer of observers) {
      observer(command)
    }
  }

  function start() {
    socket.on('connect', functions.connect)
    socket.on('config', functions.config)
    socket.on('setup', functions.setup)
    socket.on('add-player', functions['add-player'])
    socket.on('remove-player', functions['remove-player'])
    socket.on('move-player', functions['move-player'])
    socket.on('colision', functions.colision)
  }

  return {
    start,
    subscribe
  }
}
