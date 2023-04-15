import { test } from 'uvu'
import * as assert from 'uvu/assert'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import {
  cookiemonster,
  formatScenario,
  parseScenario,
  middleware,
  verifyRequest,
  IScenario,
  IRequest,
  IFakeRequest
} from '../../main/ts/index'

test('verifyRequest()', () => {
  const cases: [IRequest, IFakeRequest, string?][] = [
    [{method: 'get'}, {method: 'post'}, 'req method mismatch: get !== post'],
    [{path: '/foo/bar', method: 'get'}, {path: '/bar/baz'}, 'req path mismatch: /foo/bar !== /bar/baz'],

  ]

  for (const [input, expected, err] of cases) {
    try {
      verifyRequest(input, expected)
    } catch (e) {
      assert.equal(e.message, err)
    }
  }
})

test('middleware()', () => {
  const req = {method: 'GET'}
  const res = {send() {return res}, status() {return res}}
  const next = console.log.bind(console)
  assert.equal(middleware(req, res, next), undefined)
});

test('integration', async () => {
  const app = express()
    .use(cookieParser())
    .use(bodyParser.json())
    .use(cookiemonster())
    .use((err, req, res, next) => {
      // console.error(err)
      res.status(500).end()
    })
  const server = await app.listen(8080)
  const scenario: IScenario = {steps: [{res: {code: 200, body: {foo: 'bar'}}}]}
  const cookie = formatScenario(scenario)
  const cookiePrefix='Cookiemonster='
  const result = await fetch('http://localhost:8080', {
    headers: {
      Cookie: `${cookiePrefix}${cookie};Foo=bar`
    }
  })
  const _cookie = result.headers.get('set-cookie').slice(cookiePrefix.length, -'; Path=/'.length)
  const _scenario = parseScenario(_cookie)

  assert.ok(result.ok)
  assert.equal(await result.json(), {foo: 'bar'})
  assert.equal(result.status, 200)
  assert.equal(_scenario.cursor, 1)

  const err = await fetch('http://localhost:8080', {
    headers: {
      Cookie: `${cookiePrefix}${_cookie}`
    },
  })
  assert.ok(!err.ok)
  assert.equal(err.status, 500)

  await server.close()
})

test.run()
