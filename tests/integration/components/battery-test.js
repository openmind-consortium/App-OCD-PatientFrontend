import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | battery', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('value', 0)
    await render(hbs`<Battery @value={{value}}/>`);
    assert.equal(this.element.textContent.trim(), '0%', 'text is "0%" when value is 0.');
    assert.ok(find('.fa-battery-empty'), '".fa-battery-empty" when value is 0.');
  });
});
