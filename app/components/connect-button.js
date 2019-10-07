import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  zmq: service('zmq-client'),
  actions: {
    updateStatus(device) {
      // let rec = this.get('model.device')
      let message = {message_type: 'get', message: 'device_status'}

      const result = this.zmq.request(message)
      result.then((response) => {
        if (response["payload"]["success"]) {
          device.set('error', '')
          device.set('recording', response["payload"]["sense_status"])
          device.set('recording', response["payload"]["battery"] / 100)
          device.set('recording', response["payload"]["stim_status"])
        } else {
          device.set('error', response["payload"]["error_message"])
        }
      })
    }
  }
});
