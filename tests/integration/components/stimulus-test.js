import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | stimulus', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Stimulus @voltage={{voltage}} />`);
    this.set('voltage', 0)
    assert.ok(find('.fa-head-side-brain'), 'should render stimulus badge with fa icon.')
    assert.equal(this.element.textContent.trim(), 'Stimulation OFF', 'text should be Stimulation OFF when voltage is 0');

    this.set('voltage', 0.4)
    assert.equal(this.element.textContent.trim(), 'Stimulation ON 0.4mA', 'text shuld show voltage when voltage is not 0');

  });
});
