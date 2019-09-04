import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /index', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
  });

  test('navigation works', async function(assert) {
    await visit('/');
    await click('.nav-record a');
    assert.equal(currentURL(), '/record', 'record should link to /record route');

    await click('.nav-help a');
    assert.equal(currentURL(), '/help', 'help should link to /help route');

    await click('.nav-settings a');
    assert.equal(currentURL(), '/settings', 'help should link to /settings route');

  })
});
