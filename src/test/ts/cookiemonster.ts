import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { middleware } from '../../main/ts/cookiemonster'

test('cookiemonster', () => {
  assert.equal(middleware(), 'test')
})

test.run()
