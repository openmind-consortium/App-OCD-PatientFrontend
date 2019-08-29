import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | home', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /home', async function(assert) {
    await visit('/home');
    assert.equal(currentURL(), '/home');
  });
});
