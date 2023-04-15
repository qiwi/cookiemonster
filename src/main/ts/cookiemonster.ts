import assert from 'node:assert/strict'
import { Buffer } from 'node:buffer'
import yaml from 'js-yaml'
import {IScenario, IScenarioNormalized, IResponse, IRequest, INext, IFakeRequest} from './interface'

export const cookiemonster = () => middleware

export const middleware = (req: IRequest, res: IResponse, next: INext) => {
  try {
    const {cookies = {}} = req
    const raw = extractScenario(cookies)
    if (!raw) {
      throw new Error('scenario not found')
    }
    const scenario = parseScenario(raw)
    const {code, body, cookie} = processScenario(scenario, req)

    res.cookie('Cookiemonster', cookie)
    res
      .status(code)
      .send(body)

  } catch (e) {
    next(e)
  }
}

export const processScenario = (scenario: IScenario, input: IRequest) => {
  const {steps, cursor} = normalizeScenario(scenario)
  const step = steps[cursor]
  if (!step) {
    throw new Error(`step ${cursor} not found`)
  }
  const {req, res } = step

  verifyRequest(input, step.req)

  return {
    code: res.code || 200,
    body: res.body || null,
    cookie: formatScenario({...scenario, cursor: cursor + 1})
  }
}

export const verifyRequest = (input: IRequest, expected: IFakeRequest) => {
  if (expected.method && input.method !== expected.method) {
    throw new Error(`req method mismatch: ${input.method} !== ${expected.method}`)
  }

  if (expected.path && input.path !== expected.path) {
    throw new Error(`req path mismatch: ${input.path} !== ${expected.path}`)
  }
}

export const formatScenario = (scenario: IScenario) => Buffer.from(yaml
  .dump(scenario, {
    indent: 0,
    noArrayIndent: true,
    flowLevel: 0,
    condenseFlow: false,
  })).toString('base64url')

// https://www.rfc-editor.org/rfc/rfc7540#section-8.1.2.5
export const extractScenario = (cookies: Record<string, string>) =>
  Object.keys(cookies)
  .sort()
  .filter(k => k.startsWith('Cookiemonster'))
  .reduce((m, k) => m + cookies[k], '')

export const parseScenario = (raw: string): IScenario =>
  yaml.load(Buffer.from(raw, 'base64url').toString('utf8')) as IScenario

export const normalizeScenario = (scenario: IScenario): IScenarioNormalized => ({
  cursor: Number.parseInt(scenario.cursor as string)|0,
  steps: scenario.steps.map(({req = {}, res = {}}) => {
    const _res = typeof res === 'string' ? scenario.responses?.[res] : res
    const _req = typeof req === 'string' ? scenario.responses?.[req] : req

    assert(_req, `scenario req unknown: ${req}`)
    assert(_res, `scenario res unknown: ${res}`)

    return {
      req: _req,
      res: _res
    }
  })
})
