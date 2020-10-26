const { Request } = require('zeromq')

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
    }).catch((err) => {
      console.log(err)
      throw err
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

  let message_obj = JSON.parse(message)
  let message_type = message_obj["message"]

  await sock.send(message)

  const error_message = {
    message_type: "result",
    message: message_type,
    payload: {status: false, error_code: -1, error_message: "Device not responding."}}

  const error_string = JSON.stringify(error_message)

  try {
    const res = await race(sock.receive(), 30000, error_string)
    str = res.toString()
    console.log(str)
    return str
  } catch (err) {
    console.log("Error caught in zmq communication with Summit API")
    console.log(err)
    throw err
  }
}

module.exports = sendAndReceive
