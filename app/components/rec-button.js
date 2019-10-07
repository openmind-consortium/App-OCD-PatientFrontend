import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  zmq: service('zmq-client'),
  actions: {
    toggleRec(rec) {
      // let rec = this.get('model.device')
      let message = {message_type: 'post', message: 'stim-on'}
      if (rec.get('recording')) message["message"] = 'stim-off'

      const result = this.zmq.request(message)
      result.then((response) => {
        if (response["payload"]["success"]) {
          rec.set('error', '')
          rec.toggleProperty('recording')
        } else {
          rec.set('error', response["payload"]["error_message"])
        }
      })
    }
  }
});
