/* global require */
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  zmq: service('zmq-client'),
  actions: {
    quit() {
      // Send quit message to summit-interface
      const message = {message_type: 'post', message: 'quit', payload: {}}
      this.zmq.request(message)

      // Close electron window
      const { remote } = require('electron');
      let w = remote.getCurrentWindow()
      w.close()
    }
  }
});
