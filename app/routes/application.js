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
      error: 'Connecting...'
    });
  },

  afterModel(model) {
    const getStatus = (device) => {
      console.log("getting battery status")
      const batteryMessage = {message_type: 'get', message: 'battery'}
      const batteryStatus = this.zmq.request(batteryMessage)
      batteryStatus
        .then((response) => {
          if (response['payload']['success']) {
            device.set('battery', response['payload']['battery_level']/100)
          } else {
            device.set('error', response['payload']['error_message'])
          }
        })
        .then(() => {
          console.log("getting stim status")
          const stimMessage = {message_type: 'get', message: 'stim-status'}
          const stimStatus = this.zmq.request(stimMessage)
          stimStatus.then((response) => {
            if (response['payload']['success']) {
              device.set('stimulation_voltage', response['payload']['stim_on'])
            } else {
              device.set('error', response['payload']['error_message'])
            }
          })
          .then(() => {
            console.log("getting sense status")
            const senseMessage = {message_type: 'get', message: 'sense-status'}
            const senseStatus = this.zmq.request(senseMessage)
            senseStatus.then((response) => {
              if (response['payload']['success']) {
                device.set('recording', response['payload']['sense_on'])
              } else {
                device.set('error', response['payload']['error_message'])
              }
            })
          })
        })
    }
    let device = model.store.peekRecord('device', 1)
    getStatus(device)
    window.setInterval(getStatus, 60000, device)
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('settings', this.settings.content);
  }
});
