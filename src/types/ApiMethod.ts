import { ApiParam } from './ApiParamType'

export type ApiMethod = {
  name: string
  icon: string
  method: 'GET' | 'POST'
  params: Record<string, ApiParam>
}
