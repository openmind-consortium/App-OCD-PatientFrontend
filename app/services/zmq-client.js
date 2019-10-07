import Service from '@ember/service';
const {ipcRenderer} = window.requireNode('electron');

export default Service.extend({
  init() {
    this._super(...arguments);
  },

  request(message) {
    return new Promise(resolve => {
      let message_type = message["message"]
      console.log(message)
      let message_str = JSON.stringify(message)
      ipcRenderer.send('request', message_str)
      ipcRenderer.on('response', (event, args) => {
        console.log(args)
        const resp = JSON.parse(args)
        if (resp["message"] === message_type) {
          console.log(resp)
          resolve(resp)
        }
      })
    })
  }
});
