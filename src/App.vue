<script lang="ts">
import { computed, ref, watch } from 'vue'
import { useAxios } from '@vue-composable/axios'

import MainForm from './fragments/MainForm.vue'
import BMessage from './components/BMessage.vue'
import SyntaxHighlight from './components/SyntaxHighlight.vue'

import { useApi } from './hooks/use-api'
import { API_METHODS } from './constants/API_METHODS'
import { ApiMethodName } from './types/ApiMethodName'

export default {
  name: 'App',
  components: {
    MainForm,
    BMessage,
    SyntaxHighlight
  },
  setup() {
    const token = ref(localStorage.getItem('token') || '')

    const apiMethod = ref(JSON.parse(`${localStorage.getItem('apiMethod')}`) || API_METHODS.getMe)
    const apiParams = ref<Record<string, any>>({})
    const jsonApiParams = computed(() => JSON.stringify(apiParams.value, null, 4))

    const { data, loading, error, status, callApi } = useApi(apiMethod, token, apiParams)

    const apiResult = computed(() => {
      const message = JSON.stringify(data && data.value, null, 4)

      if (loading.value) {
        return { title: 'Carregando...', type: 'info', message: 'Por favor, aguarde.' }
      }

      const isSuccess = data.value && data.value.ok && !loading.value

      return isSuccess
        ? { title: 'Response', type: 'success', message, pre: true }
        : { title: `${error.value}`, type: 'danger', message, pre: true }
    })

    const showMessage = computed(() => Boolean(error.value || data.value || loading.value))

    watch(token, () => {
      localStorage.setItem('token', token.value)
    })

    watch(apiMethod, () => localStorage.setItem('apiMethod', JSON.stringify(apiMethod.value)))

    return {
      token,
      apiMethod,
      apiParams,
      callApi,
      loading,
      showMessage,
      apiResult,
      jsonApiParams
    }
  }
}
</script>

<template>
  <section class="section">
    <div class="container-fluid">
      <main-form
        :loading="loading"
        v-model:method="apiMethod"
        v-model:token="token"
        v-model:params="apiParams"
        @submit="callApi"
      />
      <br />
      <b-message title="Request" type="warning">
        <syntax-highlight language="json" :content="jsonApiParams" />
      </b-message>
      <b-message :show="showMessage" v-bind="apiResult">
        <component
          :is="apiResult.pre ? 'syntax-highlight' : 'div'"
          language="json"
          :content="apiResult.message"
        />
      </b-message>
    </div>
  </section>
</template>

<style lang="scss">
@import 'bulma-dracula/src/bulma-dracula-vars';
@import 'bulma/bulma';
@import './style/prism';
@import 'prismjs/plugins/toolbar/prism-toolbar';
@import 'prismjs/plugins/line-numbers/prism-line-numbers';

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
