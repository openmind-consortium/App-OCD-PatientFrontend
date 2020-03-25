import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  zmq: service('zmq-client'),
  actions: {
    updateStatus(device) {
      // let rec = this.get('model.device')
      let message = {message_type: 'get', message: 'device_info'}

      const result = this.zmq.request(message)
      result.then((response) => {
        console.log(response);
        console.log(device);
        if (response['payload']['success']) {
          device.set('error', '')
          device.set('stimulation_voltage', response['payload']['stim_on'])
          device.set('recording', response['payload']['sense_on'])
          device.set('battery', response['payload']['battery_level'])
        } else {
          device.set('error', response['payload']['error_message'])
        }
      })
    }
  }
});
