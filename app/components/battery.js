import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  percentage: computed('value', function() {
    return Math.round(parseFloat(this.value)) + '%'
  }),
  level: computed('value', function() {
    let fa;
    if (this.value === 0) {
      fa = "empty"
    }
    if (0 < this.value <= 0.1) {
      fa = "slash"
    }
    if (0.1 < this.value && this.value < 0.30) {
      fa = "quarter"
    }
    if (0.30 <= this.value && this.value < 0.60) {
      fa = "half"
    }
    if (0.60 <= this.value && this.value < 0.90) {
      fa = "three-quarters"
    }
    if (this.value >= 0.90) {
      fa = "full"
    }
    return fa
  })
});
