export default class Player {
  constructor(id, x, y) {
    this.x = x
    this.y = y
    this.id = id
    this.points = 0
  }

  action(key) {
    const actions = {
      ArrowUp: function () {
        if (this.y > 0)
          this.y--
      },
      ArrowDown: function () {
        if (this.y < configs.map.height - 1)
          this.y++
      },
      ArrowLeft: function () {
        if (this.x > 0)
          this.x--
      }
      ,
      ArrowRight: function () {
        if (this.x < configs.map.width - 1)
          this.x++
      }
    }

    const action = actions[key]

    if (action) {
      action()
    }
  }

  addPoint() {
    this.points++
  }

  getCordenates() {
    return { x: this.x, y: this.y }
  }
}
