import Route from '@ember/routing/route';
import I18nMixin from 'ember-i18next/mixins/i18n';
import LngDetector from 'i18next-browser-languagedetector';

export default Route.extend(I18nMixin, {

  async beforeModel() {
    await this.i18n.i18next.use(LngDetector);
    await this.i18n.initLibraryAsync();
    // this.setHTMLLang();
  },
  actions: {
    toggleMode() {
      this.controller.toggleProperty('isDark');
    }
  }
});
