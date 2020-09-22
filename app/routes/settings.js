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
    toggleBeeps() {
      console.log('beep toggled');
      this.settings.toggleProperty('beeps_on');
      let message = {message_type: 'post', message: 'beep_change', payload: {'beep_on': this.settings.get('beeps_on')}};
      this.zmq.request(message);
    }
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('settings', this.settings);
  }
});
