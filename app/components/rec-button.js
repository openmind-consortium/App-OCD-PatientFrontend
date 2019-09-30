import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  zmq: service('zmq-client'),
  actions: {
    toggleRec() {
      const message = {message_type: 'post', message: 'stim-on'}
      const promise = this.zmq.request(JSON.stringify(message))
      promise.then((response) => {
        if (response["payload"]["success"]) {
        this.store.findRecord('device', 1).then((rec) => {
          rec.set('error', '')
          rec.toggleProperty('recording')
          })
        } else {
          this.store.findRecord('device', 1).then((rec) => {
            rec.set('error', response["payload"]["error_message"])
          })
        }
      })
    }
  }
});
