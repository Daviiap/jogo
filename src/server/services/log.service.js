const connected = (playerId, connectionsCount) => {
  console.log(`\n[!CONNECTED]: id-${playerId}`)

  if (connectionsCount === 1) {
    console.log(`Total de ${connectionsCount} pessoa conectada.`)
  } else {
    console.log(`Total de ${connectionsCount} pessoas conectadas.`)
  }
}

const disconnected = (playerId, connectionsCount) => {
  console.log(`\n[!DISCONNECTED]: id-${playerId}`)

  if (connectionsCount === 1) {
    console.log(`Total de ${connectionsCount} pessoa conectada.`)
  } else {
    console.log(`Total de ${connectionsCount} pessoas conectadas.`)
  }
}

export default {
  connected,
  disconnected
}
