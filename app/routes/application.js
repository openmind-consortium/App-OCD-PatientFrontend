import Route from '@ember/routing/route';
import I18nMixin from 'ember-i18next/mixins/i18n';
import LngDetector from 'i18next-browser-languagedetector';

export default Route.extend(I18nMixin, {
  async beforeModel() {
    await this.i18n.i18next.use(LngDetector);
    await this.i18n.initLibraryAsync();
    // this.setHTMLLang();
  },

  model() {
    return this.store.createRecord('device', {
      patient_name: 'Nicole',
      battery: 0.63482,
      recording: false,
      stimulation_voltage: 0
    });
  },

  actions: {
    toggleMode() {
      this.controller.toggleProperty('settings.isDark');
    },
    toggleRec() {
      this.currentModel.toggleProperty('recording');
      this.currentModel.save();
    }
  }
});
