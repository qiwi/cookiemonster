import { test } from 'uvu'
import assert from 'node:assert'
import {middleware} from '@qiwi/cookiemonster'

test('index (cjs)', () => {
  assert.ok(typeof middleware === 'function')
})

test.run()
