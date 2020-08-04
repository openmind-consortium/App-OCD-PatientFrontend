import Route from '@ember/routing/route';
import { storageFor } from 'ember-local-storage';

export default Route.extend({
  model() {
    return this.modelFor('application')
  },
  settings: storageFor('settings'),
  
  setupController(controller) {
    this._super(...arguments);
    controller.set('settings', this.settings.content);
  }
});
