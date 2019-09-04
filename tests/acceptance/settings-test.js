import { module, test } from 'qunit';
import { visit, currentURL, click, find, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Acceptance | settings', function(hooks) {
  setupApplicationTest(hooks);

  hooks.afterEach(function() {
    if (window.localStorage) {
      window.localStorage.clear();
    }
    resetStorages();
  });

  test('visiting /settings', async function(assert) {
    await visit('/settings');

    assert.equal(currentURL(), '/settings', 'visiting /settings should work');
    a11yAudit();
  });

  test('render in dark mode', async function(assert) {
    await visit('/settings');
    assert.ok(find('.bg-dark-mode'), 'should render application in dark mode');
  });

  test('toggle light mode', async function(assert) {
    await visit('/settings');
    await click('.ember-checkbox');
    assert.ok(find('.bg-light-mode'), 'should toggle to light mode');
    assert.notOk(find('.bg-dark-mode'), 'should remove dark mode class');
  });

  test('fill in user name', async function(assert) {
    await visit('/settings');
    fillIn('.input-group-text', 'Foo Bar');
    await visit('/');
    assert.equal(find('.greeting').textContent.trim(), 'Hello, Foo Bar', 'should set the user name')
  })
});
