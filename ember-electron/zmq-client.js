const { Request } = require('zeromq-ng')

const ZMQ_PORT = 5556
const ZMQ_IP = `tcp://127.0.0.1:${ZMQ_PORT}`

async function sendAndReceive(message) {
  const sock = new Request({connectTimeout: 1000, receiveTimeout: 5000})
  console.log(sock.connectTimeout)
  console.log(sock.receiveTimeout)
  try {
    sock.connect(ZMQ_IP)
  } catch (err) {
    console.log(err)
    throw(err)
  }

  await sock.send(JSON.stringify(message))

  try {
    const res = await sock.receive()
    str = res.toString()
    return str
  } catch (err) {
    console.log("Error caught in zmq communication with Summit API")
    throw(err)
  }
}

module.exports = sendAndReceive
