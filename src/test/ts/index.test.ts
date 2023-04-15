import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { middleware } from '../../main/ts/index'

test('index has proper index', () => {
  assert.ok(typeof middleware === 'function')
})

test.run()
