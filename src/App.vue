<script setup lang="ts">
import { useAxios } from '@vue-composable/axios'
import { computed, ref, watch } from 'vue'
import BInput from './components/BInput.vue'
import BSelect from './components/BSelect.vue'
import BCheckbox from './components/BCheckbox.vue'

type ApiParamType = 'string' | 'boolean' | 'number'

type ApiMethod = {
  icon: string
  method: 'GET' | 'POST'
  params: Record<string, ApiParamType>
}

export const API_METHODS: Record<string, ApiMethod> = {
  getMe: {
    icon: 'fas fa-user-circle',
    method: 'GET',
    params: {}
  },
  getUpdates: {
    icon: 'fas fa-sync',
    method: 'GET',
    params: {
      offset: 'number',
      limit: 'number',
      timeout: 'number'
    }
  },
  sendMessage: {
    icon: 'fas fa-paper-plane',
    method: 'POST',
    params: {
      chat_id: 'number',
      text: 'string'
    }
  }
}

type ApiMethodName = keyof typeof API_METHODS

export const token = ref('')

export const AVAILABLE_METHODS = Object.keys(API_METHODS) as ApiMethodName[]
export const apiMethodName = ref(AVAILABLE_METHODS[0])
export const apiMethod = computed(() => API_METHODS[apiMethodName.value])
export const apiMethodParams = computed(() =>
  Object.entries(apiMethod.value.params)
)

export const paramValues = ref({})

export const { data, loading, error, exec, status } = useAxios(false)

export const callApi = () =>
  exec({
    url: `https://api.telegram.org/bot${token.value}/${apiMethodName.value}`,
    method: apiMethod.value.method,
    params: paramValues.value
  })

export const log = (e: any) => console.log(e)

export const resultValues = computed(() => {
  if (data.value && data.value.ok && !loading.value) {
    return {
      title: 'Resultado',
      class: 'is-success',
      body: `<pre>${JSON.stringify(data.value, null, 4)}</pre>`
    }
  }

  if (error.value) {
    return {
      title: 'Erro',
      class: 'is-danger',
      body: `<pre>${error.value}\n\n\n${JSON.stringify(
        data.value,
        null,
        4
      )}</pre>`
    }
  }

  return {
    title: 'Carregando...',
    class: 'is-info',
    body: 'Por favor, aguarde.'
  }
})

watch(apiMethodParams, () => {
  paramValues.value = Object.fromEntries(
    apiMethodParams.value.map(([key]) => [key, ''])
  )
})

export default {
  name: 'App',
  components: {
    BInput,
    BSelect,
    BCheckbox
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="card">
        <div class="card-content">
          <form @submit.prevent>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">API Data</label>
              </div>
              <div class="field-body">
                <b-input
                  icon-left="fas fa-key"
                  type="password"
                  v-model="token"
                  placeholder="Bot API Token"
                />
                <b-select
                  :disabled="!token"
                  :icon-left="apiMethod.icon"
                  :items="AVAILABLE_METHODS"
                  v-model="apiMethodName"
                />
              </div>
            </div>
            <div
              class="field is-horizontal"
              v-for="([paramName, paramType], index) in apiMethodParams"
              :key="index"
            >
              <div class="field-label is-normal">
                <label class="label">{{ paramName }}</label>
              </div>
              <div class="field-body">
                <b-input
                  v-if="paramType === 'string'"
                  type="text"
                  v-model="paramValues[paramName]"
                />
                <b-input
                  v-if="paramType === 'number'"
                  type="number"
                  v-model="paramValues[paramName]"
                />
                <b-checkbox
                  v-if="paramType === 'boolean'"
                  v-model="paramValues[paramName]"
                />
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label"></div>
              <div class="field-body">
                <button
                  @click.prevent="callApi"
                  :disabled="!token || loading"
                  class="button is-info is-fullwidth"
                >
                  Enviar
                </button>
              </div>
            </div>
          </form>

          <br />

          <article
            v-if="error || data || loading"
            class="message"
            :class="resultValues.class"
          >
            <div class="message-header">
              <p>{{ resultValues.title }}</p>
            </div>
            <div class="message-body" v-html="resultValues.body"></div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@import 'bulma/bulma';

body,
html {
  background-color: #dedede;
  height: 100%;
}

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

pre {
  text-align: left;
}
</style>
