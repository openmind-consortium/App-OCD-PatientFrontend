import Controller from '@ember/controller';
import I18nMixin from 'ember-i18next/mixins/i18n';

export default Controller.extend(I18nMixin, {
  actions: {
    changeLocale(locale) {
      this.set('i18n.locale', locale);
    }
  }
});
