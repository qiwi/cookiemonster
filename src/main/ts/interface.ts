export type IScenario = {
  cursor?: string,
  steps: IStep [],
  requests?: Record<string, IFakeRequest>
  responses?: Record<string, IFakeResponse>
}

export type IStep = {
  req?: string | IFakeRequest
  res?: string | IFakeResponse
}

export type IFakeRequest = {
  method?: string
  path?: string
  body?: string | IJsonSchema
}

export type IFakeResponse = {
  code?: number
  body?: string
  headers?: Record<string, string>
}

export type IJsonSchema = {}

export type IStepNormalized = {
  req: IFakeRequest
  res: IFakeResponse
}

export type IScenarioNormalized = {
  cursor: number
  steps: IStepNormalized[]
}
