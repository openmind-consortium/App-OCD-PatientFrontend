import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  zmq: service('zmq-client'),
  actions: {
    toggleRec() {
      this.toggleRec();
      this.zmq.request('test')
    }
  }
});
