import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  percentage: computed('value', function() {
    return Math.round(parseFloat(this.value)) + '%'
  }),
  level: computed('value', function() {
    let fa;
    const val = Math.round(parseFloat(this.value))
    if (val === 0) {
      fa = "empty"
    }
    if (0 < val <= 10) {
      fa = "slash"
    }
    if (10 < val && val < 30) {
      fa = "quarter"
    }
    if (30 <= val && val < 60) {
      fa = "half"
    }
    if (60 <= val && val < 90) {
      fa = "three-quarters"
    }
    if (val >= 90) {
      fa = "full"
    }
    return fa
  })
});
