import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | settings', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /settings', async function(assert) {
    await visit('/settings');

    assert.equal(currentURL(), '/settings', 'visiting /settings should work');

    a11yAudit();
  });
});
