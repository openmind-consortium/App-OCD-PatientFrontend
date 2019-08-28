import Route from '@ember/routing/route';
import I18nMixin from 'ember-i18next/mixins/i18n';
import LngDetector from 'i18next-browser-languagedetector';
import { storageFor } from 'ember-local-storage';

export default Route.extend(I18nMixin, {
  settings: storageFor('settings'),

  async beforeModel() {
    await this.i18n.i18next.use(LngDetector);
    await this.i18n.initLibraryAsync();
    // this.setHTMLLang();
  },

  model() {
    return this.store.createRecord('device', {
      battery: 0.63482,
      recording: false,
      stimulation_voltage: 0
    });
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('settings', this.settings.content);
  }
});
