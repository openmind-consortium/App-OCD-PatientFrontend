import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  stimulus: computed('status', function() {
    let stimulusClass;
    if (this.status == 'on'){
      stimulusClass = 'stimulus_on'
    }
    if (this.status == 'off') {
      stimulusClass = 'stimulus_off'
    }
    return stimulusClass
  }),
  name: computed('status', function() {
    return this.status.toUpperCase()
  }),
  voltage: computed('volt', 'status', function() {
    if (this.status != 'off') {
      return this.volt + 'mA'
    }
  })
});
