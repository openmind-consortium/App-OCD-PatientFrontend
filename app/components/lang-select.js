import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  i18n: service(),
  actions: {
    changeLocale(locale) {
      this.set('i18n.locale', locale);
    }
  }
});
