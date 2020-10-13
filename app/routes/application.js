import Route from '@ember/routing/route';
import I18nMixin from 'ember-i18next/mixins/i18n';
import LngDetector from 'i18next-browser-languagedetector';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';

export default Route.extend(I18nMixin, {
  settings: storageFor('settings'),
  zmq: service('zmq-client'),

  beforeModel() {
    this.i18n.i18next.use(LngDetector);
    return this.i18n.initLibraryAsync();
  },

  model() {
    return this.store.createRecord('device', {
      id: 1,
      battery: 0,
      recording: false,
      stimulation_voltage: 0,
      beep_disabled: true,
      error: 'Connecting...'
    });
  },

  afterModel(model) {
    const getStatus = (device) => {
      const statusMessage = {message_type: 'get', message: 'device_info'}
      const deviceStatus = this.zmq.request(statusMessage)
      deviceStatus
        .then((response) => {
          console.log(response['payload'])
          if (response['payload']['success']) {
            device.set('error', '')
            device.set('stimulation_voltage', response['payload']['stim_on'])
            device.set('recording', response['payload']['sense_on'])
            device.set('battery', response['payload']['battery_level'])
          } else {
            device.set('error', response['payload']['error_message'])
          }
          device.set('beep_disabled', response['payload']['beep_disabled'])
          this.settings.set('beep_disabled', response['payload']['beep_disabled'])
        })
    }
    let device = model.store.peekRecord('device', 1)
    getStatus(device)
    window.setInterval(getStatus, 30000, device)

  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('settings', this.settings.content);
  }
});
