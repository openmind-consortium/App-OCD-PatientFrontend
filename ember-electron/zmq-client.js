const { Request } = require('zeromq-ng')

const ZMQ_PORT = 5556
const ZMQ_IP = `tcp://127.0.0.1:${ZMQ_PORT}`

async function sendAndReceive() {
  const sock = new Request()
  try {
    sock.connect(ZMQ_IP)
  } catch (err) {
    console.log(err)
  }

  const testMsg = {
  	"message_type": "get",
  	"message": "stim-status"
    }

  await sock.send(JSON.stringify(testMsg))

  try {
    const res = await sock.receive()
    console.log(`received ${res}`)
    return res
  } catch (err) {
    console.log(err)
    console.log(`timeout expired`)
  }

}

module.exports = sendAndReceive
