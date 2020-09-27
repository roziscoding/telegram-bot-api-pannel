<script lang="ts">
import BInput from '../components/BInput.vue'
import BSelect from '../components/BSelect.vue'
import BCheckbox from '../components/BCheckbox.vue'
import { computed, PropType, ref, watch } from 'vue'

import { useModel } from '../hooks/use-model'
import { ApiMethod } from '../types/ApiMethod'
import { API_METHODS } from '../constants/API_METHODS'
import { ApiMethodName } from '../types/ApiMethodName'

export default {
  name: 'MainForm',
  props: {
    method: {
      type: Object as PropType<ApiMethod>,
      required: true
    },
    token: {
      type: String,
      default: ''
    },
    params: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    loading: Boolean
  },
  setup(props, { emit }) {
    const AVAILABLE_METHODS = Object.entries(API_METHODS).map(([name, value]) => ({ name, value }))
    const apiMethodParams = computed(() => {
      return Object.entries(props.method.params)
    })
    const apiParams = ref<Record<string, any>>({})

    const updateMethod = useModel(emit, 'method')
    const updateToken = useModel(emit, 'token')
    const updateParams = useModel(emit, 'params')

    const submit = () => emit('submit')

    watch(apiMethodParams, () => {
      apiParams.value = Object.fromEntries(apiMethodParams.value.map(([key]) => [key, '']))
    })

    watch(
      apiParams,
      () => {
        updateParams(apiParams.value as any)
      },
      { deep: true }
    )

    return {
      AVAILABLE_METHODS,
      apiMethodParams,
      apiParams,
      updateMethod,
      updateToken,
      submit,
      updateParams
    }
  },
  components: {
    BInput,
    BSelect,
    BCheckbox
  }
}
</script>
<template>
  <form @submit.prevent>
    <b-input
      label="API Token"
      icon-left="fas fa-key"
      type="password"
      :modelValue="token"
      @update:modelValue="updateToken($event)"
      placeholder="Bot API Token"
    />
    <b-select
      label="API Method"
      :disabled="!token"
      :icon-left="method.icon"
      :items="AVAILABLE_METHODS"
      :modelValue="method"
      @update:modelValue="updateMethod($event)"
    />

    <template v-for="([paramName, paramType], index) in apiMethodParams" :key="index">
      <b-input
        :key="index"
        :label="paramName"
        v-if="paramType === 'string'"
        type="text"
        v-model="apiParams[paramName]"
      />
      <b-input
        :key="index"
        :label="paramName"
        v-if="paramType === 'number'"
        type="number"
        v-model="apiParams[paramName]"
      />
      <b-checkbox
        :key="index"
        :label="paramName"
        v-if="paramType === 'boolean'"
        v-model="apiParams[paramName]"
      />
    </template>

    <div class="field">
      <div class="field-label"></div>
      <div class="field-body">
        <button
          @click.prevent="submit"
          :disabled="!token || loading"
          class="button is-info is-fullwidth"
        >
          Enviar
        </button>
      </div>
    </div>
  </form>
</template>
