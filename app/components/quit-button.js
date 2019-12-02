/* global require */
import Component from '@ember/component';

export default Component.extend({
  zmq: service('zmq-client'),
  actions: {
    quit() {
      // Send quit message to summit-interface
      const message = {message_type: 'post', message: 'quit'}
      this.zmq.request(message)

      // Close electron window
      const { remote } = require('electron');
      let w = remote.getCurrentWindow()
      w.close()
    }
  }
});
