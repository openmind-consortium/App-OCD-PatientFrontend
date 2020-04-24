import Route from '@ember/routing/route';
import { storageFor } from 'ember-local-storage';

export default Route.extend({
  settings: storageFor('settings'),

  model() {
    return this.settings.content;
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
    }
  }
});
