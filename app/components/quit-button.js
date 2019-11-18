/* global require */
import Component from '@ember/component';

export default Component.extend({
  actions: {
    quit() {
      const { remote } = require('electron');
      let w = remote.getCurrentWindow()
      w.close()
    }
  }
});
