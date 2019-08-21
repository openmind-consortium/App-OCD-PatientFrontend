import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  i18n: service(),
  clock: service(),
  formatter: computed('i18n.locale', function () {
    const locale = this.i18n.locale;
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric'
    });
  }),
  time: computed('formatter', 'clock.second', 'showClock', function () {
    return this.formatter.format(new Date());
  })
});
