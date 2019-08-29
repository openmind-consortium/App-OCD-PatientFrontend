import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | record', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /record', async function(assert) {
    await visit('/record');

    assert.equal(currentURL(), '/record', 'visiting /record should work');
    a11yAudit();
  });
});
