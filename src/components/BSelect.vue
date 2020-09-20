<template>
  <b-field v-bind="$attrs">
    <template v-slot:default="slotProps">
      <div class="select is-fullwidth" v-bind="slotProps">
        <select
          :value="modelValue"
          @input="updateModelValue"
          :disabled="disabled"
        >
          <option value="" v-if="allowEmpty"></option>
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.name }}
          </option>
        </select>
      </div>
    </template>
  </b-field>
</template>

<script setup="props, { emit }" lang="ts">
import { computed, SetupContext } from 'vue'

import BField from './BField.vue'
import { useModel } from '../hooks/use-model'

declare const emit: SetupContext['emit']

declare const props: {
  items: Array<string | { name: string; value: string }>
  allowEmpty?: boolean
  modelValue?: string
  disabled?: boolean
}

export const updateModelValue = useModel(emit)

export const options = computed(() =>
  props.items.map((item) => {
    if (typeof item !== 'string') return item
    return { name: item, value: item }
  })
)

export default {
  name: 'BSelect',
  components: {
    BField
  }
}
</script>
