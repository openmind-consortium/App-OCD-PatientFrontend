import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('record');
  this.route('help');
  this.route('settings');
  this.route('tasks');
});

export default Router;
