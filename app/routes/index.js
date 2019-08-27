import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let { settings } = this.controllerFor('application')
    return settings.content
  }
});
