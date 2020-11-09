import Route from '@ember/routing/route';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';

export default Route.extend({
  settings: storageFor('settings'),
  zmq: service('zmq-client'),

  model() {
    return this.modelFor('application')
  },

  actions: {
    updateName(val) {
      this.settings.set('userName', val);
    },
    toggleMode() {
      this.settings.toggleProperty('isDark');
    },
    toggleProvocation() {
      this.settings.toggleProperty('showProvocation');
    },
    toggleLeadIntegrityTest() {
      this.settings.toggleProperty('leadIntegrityTest');
    },
    toggleBeeps(device) {
      this.settings.toggleProperty('beeps_disabled');
      let message = {message_type: 'post', message: 'beep_change', payload: {'disable_beeps': this.settings.get('beeps_disabled')}};
      console.log(message)
      let togglePromise = this.zmq.request(message)
      togglePromise.then((res) => {
        console.log(res)
        device.set('beeps_disabled', this.settings.get('beeps_disabled'))
      })
    }
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('settings', this.settings);
  }
});
