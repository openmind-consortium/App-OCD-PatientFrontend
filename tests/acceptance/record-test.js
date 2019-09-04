import { module, test } from 'qunit';
import { visit, currentURL, find, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | record', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /record', async function(assert) {
    await visit('/record');

    assert.equal(currentURL(), '/record', 'visiting /record should work');
    a11yAudit();
  });

  test('checking button functionality', async function(assert) {
    await visit('/record');
    assert.ok(find('button.btn'), 'should find record button')
    assert.equal(find('button.btn').textContent.trim(), 'Start recording', 'record button should be set to "start recording"');
    assert.ok(find('.fa-circle'), 'record button should have .fa-circle class')

    await click(find('button.btn'));
    assert.equal(find('button.btn').textContent.trim(), 'Stop recording', 'record button should change to "stop recording" after click')
    assert.ok(find('.fa-square'), 'record button should change to .fa-square class after click')
  })
});
