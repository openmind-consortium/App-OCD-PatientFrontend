import Component from '@ember/component';

export default Component.extend({
  recording: false,
  actions: {
    toggleRec() {
      this.toggleProperty('recording');
    }
  }
});
