import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let { settings } = this.controllerFor('application')

    return settings
  },

  actions: {
    updateName(val) {
      console.log(val)
      this.controllerFor('application').set('settings.userName', val)
    },
    toggleLightMode() {
      this.controllerFor('application').toggleProperty('settings.isDark')
    }
  }
});
