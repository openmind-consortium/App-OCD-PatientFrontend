import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  zmq: service('zmq-client'),
  actions: {
    toggleRec(device) {
      let message = {message_type: 'post', message: 'sense_on'}
      if (device.get('recording')) message["message"] = 'sense_off'

      const result = this.zmq.request(message)
      result.then((response) => {
        if (response["payload"]["success"]) {
          device.set('error', '')
          device.toggleProperty('recording')
        } else {
          console.log(response['payload']['error_message'])
          device.set('error', response['payload']['error_message'])
        }
      })
    }
  }
});
