<template>
  <b-field v-bind="$attrs">
    <template v-slot:default="slotProps">
      <div class="select is-fullwidth" v-bind="slotProps">
        <select :value="selectedOption" @input="updateModelValue" :disabled="disabled">
          <option v-for="option in options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </template>
  </b-field>
</template>

<script lang="ts">
import { computed, Prop, PropType } from 'vue'

import BField from './BField.vue'
import { useModel } from '../hooks/use-model'

export default {
  name: 'BSelect',
  props: {
    items: {
      type: Array as PropType<Array<{ name: string; value: any }>>,
      required: true
    },
    modelValue: { type: Object as PropType<{ name: string; [x: string]: any }>, required: true },
    disabled: { type: Boolean, required: false, default: false }
  },
  setup(props, { emit }) {
    const updateModelValue = useModel(emit, undefined, (e) => {
      const selectedItem = props.items.find((item) => item.name === e.target.value)

      if (!selectedItem) return undefined

      return selectedItem.value
    })

    const options = computed(() => props.items.map((item) => item.name))
    const selectedOption = computed(
      () => props.items.find((item) => item.name === props.modelValue.name)?.name
    )

    return {
      updateModelValue,
      selectedOption,
      options
    }
  },
  components: {
    BField
  }
}
</script>
