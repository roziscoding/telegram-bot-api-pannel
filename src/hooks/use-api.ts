import { ref, Ref } from 'vue'
import { useAxios } from '@vue-composable/axios'

import { ApiMethod } from '../types/ApiMethod'

export function useApi(
  method: Ref<ApiMethod>,
  token: Ref<string>,
  params: Ref<Record<string, any>>
) {
  const { data, loading, error, exec, status } = useAxios(false)

  const callApi = () =>
    exec({
      url: `https://api.telegram.org/bot${token.value}/${method.value.name}`,
      method: method.value.method,
      params: params.value
    })

  return {
    data,
    loading,
    error,
    status,
    callApi
  }
}
