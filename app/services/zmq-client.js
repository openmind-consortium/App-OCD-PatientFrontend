import Service from '@ember/service';
const {ipcRenderer} = window.requireNode('electron');

export default Service.extend({
  init() {
    this._super(...arguments);
  },

  request(message) {
    return new Promise(resolve => {
      let message_type = message["message"]
      let message_str = JSON.stringify(message)
      ipcRenderer.send('request', message_str)
      const respHandler = (event, args) => {
        const resp = JSON.parse(args)
        console.log('zmq service')
        if (resp["message"] === message_type) {
          resolve(resp)
          ipcRenderer.removeListener('response', respHandler) // this self-referencing removal seems weird, but seems to work?
        }
      }
      ipcRenderer.on('response', respHandler)
    })
  }
});
