import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

const i18nStub = Service.extend({
  locale: 'en'
})

const date_formatter = new Intl.DateTimeFormat('en', {
  year: 'numeric', month: 'long', day: 'numeric'
});

const today = date_formatter.format(new Date());

module('Integration | Component | date', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:i18n', i18nStub);
  });

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Date />`);
    assert.equal(this.element.textContent.trim(), today, `should today's render date`);

  });
});
