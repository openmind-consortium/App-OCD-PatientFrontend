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
      error: ''
    });
  },

  afterModel() {
    this.store.findRecord('device', 1).then((device) => {
      const batteryMessage = {message_type: 'get', message: 'battery'}
      const batteryStatus = this.zmq.request(JSON.stringify(batteryMessage))
      batteryStatus.then((response) => {
        device.set('battery', response['payload']['battery_level']/100)
      })

      const stimMessage = {message_type: 'get', message: 'stim-status'}
      const stimStatus = this.zmq.request(JSON.stringify(stimMessage))
      stimStatus.then((response) => {
        device.set('stimulation_voltage', response['payload']['stim_on'])
      })
    })

  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('settings', this.settings.content);
  }
});
