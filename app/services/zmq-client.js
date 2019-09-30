import Service from '@ember/service';
const {ipcRenderer} = window.requireNode('electron');

export default Service.extend({
  init() {
    this._super(...arguments);
  },

  request(message) {
    return new Promise(resolve => {
      ipcRenderer.send('request', message)
      ipcRenderer.on('response', (event, args) => {
        console.log(args)
        const message = JSON.parse(args)
        resolve(message)
      })
    })


  }
});
