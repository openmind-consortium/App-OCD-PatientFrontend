import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default Component.extend({
  zmq: service('zmq-client'),
  actions: {
    toggleRec(device, lit) {
      let message = {message_type: 'post', message: 'sense_on', payload: {'run_imped_test': lit}}
      if (device.get('recording')) {
        message["message"] = 'sense_off'
        message["payload"] = {}
      }

      const result = this.zmq.request(message)
      result.then((response) => {
        if (response["payload"]["success"]) {
          device.set('error', '')
          device.toggleProperty('recording')
          if (device.get('recording') && lit) {
            device.set('error', 'lit_running')
            later(device, function() {
              device.set('error', '')
            }, 2500);
          }
        } else {
          device.set('error', response['payload']['error_message'])
        }
      })
    }
  }
});
