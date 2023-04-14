import assert from 'node:assert/strict'
import {IScenario, IScenarioNormalized} from './interface'

export const middleware = () => {
  return 'test'
}

export const parseScenario = (raw: string): IScenarioNormalized => {
  const defReq = {}
  const defRes = {code: 200, body: '{"status": "ok"}'}
  const scenario: IScenario = JSON.parse(raw)

  return {
    cursor: parseInt(scenario.cursor as string)|0,
    steps: scenario.steps.map(({req = defReq, res = defRes}) => {
      const _res = typeof res === 'string' ? scenario.responses?.[res] : res
      const _req = typeof req === 'string' ? scenario.responses?.[req] : req

      assert(_req, `scenario req unknown: ${req}`)
      assert(_res, `scenario res unknown: ${res}`)

      return {
        req: _req,
        res: _res
      }
    })
  }
}
