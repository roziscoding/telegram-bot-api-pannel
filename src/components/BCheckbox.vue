<script setup="props, { emit }" lang="ts">
import { useModel } from '../hooks/use-model'
import { computed, SetupContext } from 'vue'

declare const emit: SetupContext['emit']
declare const props: { label: string; modelValue?: boolean; disabled?: boolean }

export const dynamicAttrs = computed(() => (props.disabled ? { disabled: props.disabled } : {}))

export const update = useModel(emit)

export default {
  name: 'BCheckbox'
}
</script>

<template>
  <label class="checkbox" v-bind="dynamicAttrs">
    <input type="checkbox" @input="update" v-bind="dynamicAttrs" />
    {{ label }}
  </label>
</template>
