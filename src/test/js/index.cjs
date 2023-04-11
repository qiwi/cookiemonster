const { test } = require('uvu')
const assert = require('node:assert')
const cookiemonster = require('@qiwi/cookiemonster')

test('index (cjs)', () => {
  assert.ok(typeof cookiemonster.middleware === 'function')
})

test.run()
