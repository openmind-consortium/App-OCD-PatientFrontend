const { Request } = require('zeromq-ng')

const ZMQ_PORT = 5556
const ZMQ_IP = `tcp://127.0.0.1:${ZMQ_PORT}`

function race(promise, timeout, error) {
  var timer = null

  return Promise.race([
    new Promise((resolve, reject) => {
      timer = setTimeout(resolve, timeout, error);
      return timer
    }),
    promise.then((value) => {
      clearTimeout(timer)
      return value
    })
  ])
}

async function sendAndReceive(message) {
  const sock = new Request()
  try {
    sock.connect(ZMQ_IP)
  } catch (err) {
    console.log(err)
    throw(err)
  }

  await sock.send(message)

  const error_message = '{"message_type": "result", "message": "error", "payload": {"status": false", "error-code": -1, "error-message": "timeout"}}'

  try {
    const res = await race(sock.receive(), 3000, error_message)
    str = res.toString()
    return str
  } catch (err) {
    console.log("Error caught in zmq communication with Summit API")
    throw(err)
  }
}

module.exports = sendAndReceive
