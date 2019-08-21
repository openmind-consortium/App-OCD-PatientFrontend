import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  status: computed('recording', function() {
    let statusClass;
    if (this.recording){
      statusClass = 'pulse'
    }
    else {
      statusClass = 'idle'
    }
    return statusClass
  })
});
