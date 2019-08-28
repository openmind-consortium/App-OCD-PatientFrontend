import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.modelFor('application')
  },

  actions: {
    toggleRec() {
      this.currentModel.toggleProperty('recording');
      //this.currentModel.save();
    }
  }
});
