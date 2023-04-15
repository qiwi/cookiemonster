export type IScenario = {
  cursor?: string | number,
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
  body?: any
  headers?: Record<string, string>
}

export type IJsonSchema = any

export type IStepNormalized = {
  req: IFakeRequest
  res: IFakeResponse
}

export type IScenarioNormalized = {
  cursor: number
  steps: IStepNormalized[]
}

export interface IRequest {
  cookies?: Record<string, any>
  method: string
  [index: string]: any
}

export interface IResponse {
  status: (code: number) => IResponse
  send: (data: any) => IResponse
  [index: string]: any
}

export type INext = (err?: any) => void
