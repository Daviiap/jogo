const success = (message) => {
  console.log(`\x1b[40m\x1b[32m[SUCCESS]\x1b[37m ${message}\x1b[0m`)
}

const warning = (message) => {
  console.log(`\x1b[40m\x1b[33m[WARN]\x1b[37m ${message}\x1b[0m`)
}

const error = (message) => {
  console.log(`\x1b[40m\x1b[31m[ERROR]\x1b[37m ${message}\x1b[0m`)
}

const info = (message) => {
  console.log(`\x1b[37m\x1b[40m[INFO] ${message}\x1b[0m`)
}

const clear = () => {
  console.clear()
}

export default {
  success,
  warning,
  error,
  info,
  clear
}
