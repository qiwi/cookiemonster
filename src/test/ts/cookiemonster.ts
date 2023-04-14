import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { middleware, parseScenario } from '../../main/ts/cookiemonster'
import { IScenario, IScenarioNormalized } from '../../main/ts'

test('cookiemonster', () => {
  assert.equal(middleware(), 'test')
})

test('parseScenario()', () => {
  const cases: [IScenario, string | IScenarioNormalized][] = [
    [
      {steps: [{res: 'foo'}]},
      'scenario res unknown: foo'
    ],
    [
      {steps: [{req: 'bar'}]},
      'scenario req unknown: bar'
    ],
    [
      {
        steps: [{res: 'foo'}],
        responses: {
          foo: {
            code: 201
          }
        }
      },
      {
        cursor: 0,
        steps: [
          {req: {}, res: {code: 201}}
        ]
      }
    ]
  ];

  cases.forEach(([input, expected], i) => {
    try {
      const output = parseScenario(JSON.stringify(input))
      assert.equal(output, expected, i + '')
    } catch (e) {
      assert.equal(e.message, expected)
    }
  })
})

test.run()
