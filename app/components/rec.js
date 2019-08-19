import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  status: computed('active', function() {
    let statusClass;
    if (this.active){
      statusClass = 'pulse'
    }
    else {
      statusClass = 'idle'
    }
    return statusClass
  })
});
