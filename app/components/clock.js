import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  i18n: service(),
  clock: service(),
  timer_formatter: computed('i18n.locale', function  () {
    const locale = this.i18n.locale;
    return new Intl.DateTimeFormat(locale, {
      minute: 'numeric', second: 'numeric'
    });
  }),
  formatter: computed('i18n.locale', function () {
    const locale = this.i18n.locale;
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric'
    });
  }),
  time: computed('formatter', 'clock.second', 'showClock', function () {
    if (this.showClock) {
      return this.formatter.format(new Date());
    }
  }),
  timezero: computed('formatter', 'clock.second', function () {
    return this.formatter.format(new Date());
  }),
  second: computed('clock.second', function () {
    return new Date();
  }),
  timerStart: computed(function () {
    return null;
  }),
  timer: computed('second', 'timerStart', 'timer_formatter', 'showTimer', function () {
    let timer;
    if (this.timerStart == null) {
      let n = new Date(0,0,0,0);
      timer = this.timer_formatter.format(n)
    }
    else {
      let t = this.get('second') - this.get('timerStart');
      timer = this.timer_formatter.format(t);
    }
    if (this.showTimer) {
      return timer
    }
  }),
  showTimer: false
});
