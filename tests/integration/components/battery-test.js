import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | battery', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    await render(hbs`<Battery @value={{value}}/>`);

    this.set('value', 0)
    assert.equal(this.element.textContent.trim(), '0%', 'text is "0%" when value is 0.');
    assert.ok(find('.fa-battery-empty'), '".fa-battery-empty" when value is 0.');

    this.set('value', 0.2)
    assert.equal(this.element.textContent.trim(), '20%', 'text is "20%" when value is 0.2.');
    assert.ok(find('.fa-battery-quarter'), '".fa-battery-quarter" when value is 0.2.');

    this.set('value', 0.4)
    assert.equal(this.element.textContent.trim(), '40%', 'text is "40%" when value is 0.3.');
    assert.ok(find('.fa-battery-half'), '".fa-battery-half" when value is 0.3.');

    this.set('value', 0.7)
    assert.equal(this.element.textContent.trim(), '70%', 'text is "70%" when value is 0.7.');
    assert.ok(find('.fa-battery-three-quarters'), '".fa-battery-three-quarters" when value is 0.7.');

    this.set('value', 0.92345)
    assert.equal(this.element.textContent.trim(), '92%', 'text is "92%" when value is 0.92345.');
    assert.ok(find('.fa-battery-full'), '".fa-battery-full" when value is 0.92345.');
  });
});
