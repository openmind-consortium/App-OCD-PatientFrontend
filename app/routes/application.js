import Route from '@ember/routing/route';
import I18nMixin from 'ember-i18next/mixins/i18n';
import LngDetector from 'i18next-browser-languagedetector';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';

export default Route.extend(I18nMixin, {
  settings: storageFor('settings'),
  zmq: service('zmq-client'),
  store: service(),
  afterModel(model) {
    const getStatus = () => {
      var device = model.store.findRecord('device', 1)
      console.log("getting battery status")
      const batteryMessage = {message_type: 'get', message: 'battery'}
      const batteryStatus = this.zmq.request(JSON.stringify(batteryMessage))
      batteryStatus
        .then((response) => {
          device.set('battery', response['payload']['battery_level']/100)
        })
        .then(() => {
          console.log("getting stim status")
          const stimMessage = {message_type: 'get', message: 'stim-status'}
          const stimStatus = this.zmq.request(JSON.stringify(stimMessage))
          stimStatus.then((response) => {
            device.set('stimulation_voltage', response['payload']['stim_on'])
          })
          .then(() => {
            console.log("getting sense status")
            const senseMessage = {message_type: 'get', message: 'sense-status'}
            const senseStatus = this.zmq.request(JSON.stringify(senseMessage))
            senseStatus.then((response) => {
              device.set('recording', response['payload']['sense_on'])
            })
          })
        })
    }
    getStatus()
    window.setInterval(getStatus, 20000)
  },

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
      error: ''
    });
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('settings', this.settings.content);
  }
});
