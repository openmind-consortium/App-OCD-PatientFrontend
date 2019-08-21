import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  i18n: service(),
  date_formatter: computed('i18n.locale', function () {
    const locale = this.i18n.locale;
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }),
  formatted_date: computed('date_formatter', function () {
    return this.date_formatter.format(new Date());
  }),
});
