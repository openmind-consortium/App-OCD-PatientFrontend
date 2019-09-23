import Service from '@ember/service';
const {ipcRenderer} = window.requireNode('electron');

export default Service.extend({
  init() {
    this._super(...arguments);
    ipcRenderer.on('response', (event, args) => {
      console.log(args)
    })
  },

  request(message) {
    ipcRenderer.send('request', message)
  }
});
