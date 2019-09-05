import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | menu', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.setupRouter();
  });

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Menu />`);

    assert.ok(find('div.heading'), 'should render menu with heading');
    assert.ok(find('.nav-record'), 'should render menu with record link');
    assert.ok(find('.nav-settings'), 'should render menu with settings link');
    assert.ok(find('.nav-help'), 'should render menu with help link');

  });

});
