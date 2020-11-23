export default class Network {
  constructor(game, keyboardListener) {
    this.game = game
    this.keyboardListener = keyboardListener
    this.socket = io()
    this.observers = []
    this.functions = {
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
  }

  subscribe(observerFunction) {
    observers.push(observerFunction)
  }

  notifyAll(command) {
    for (const observer of observers) {
      observer(command)
    }
  }

  start() {
    socket.on('connect', this.functions.connect)
    socket.on('config', this.functions.config)
    socket.on('setup', this.functions.setup)
    socket.on('add-player', this.functions['add-player'])
    socket.on('remove-player', this.functions['remove-player'])
    socket.on('move-player', this.functions['move-player'])
    socket.on('colision', this.functions.colision)
  }
}
