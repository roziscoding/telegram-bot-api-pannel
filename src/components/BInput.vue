<template>
  <b-field v-bind="$attrs">
    <template v-slot:default="slotProps">
      <input
        :type="type"
        class="input"
        v-bind="slotProps"
        :value="modelValue"
        @input="updateModelValue"
        :placeholder="placeholder"
      />
    </template>
  </b-field>
</template>

<script setup="props, { emit }" lang="ts">
import { SetupContext } from 'vue'

import BField from '../components/BField.vue'
import { useModel } from '../hooks/use-model'

declare const emit: SetupContext['emit']

declare const props: {
  modelValue?: string
  type?: string
  placeholder?: string
}

export const updateModelValue = useModel(emit)

export default {
  name: 'BInput',
  components: {
    BField
  }
}
</script>
