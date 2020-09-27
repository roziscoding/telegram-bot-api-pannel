<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control is-expanded" :class="controlClasses">
      <slot :class="inputClasses" :disabled="disabled" />
      <span v-if="iconLeft" class="icon is-left" :class="iconSpanClasses">
        <i :class="iconLeft"></i>
      </span>
      <span v-if="iconRight && !loading" class="icon is-right" :class="iconSpanClasses">
        <i :class="iconRight"></i>
      </span>
    </div>
  </div>
</template>

<script setup="props, { emit }" lang="ts">
import { computed } from 'vue'

import { useSize } from '../hooks/use-size'
import { useColor } from '../hooks/use-color'
import { useIcons } from '../hooks/use-icons'

declare const props: {
  label?: string
  iconLeft?: string
  iconRight?: string
  size?: 'small' | 'medium' | 'large'
  color?: string
  loading?: boolean
  rounded?: boolean
  static?: boolean
  disabled?: boolean
}

export const { sizeClass } = useSize(props)
export const { isColorClass } = useColor(props)
export const { hasIconsClasses, iconSpanClasses } = useIcons(props)

export const controlClasses = computed(() => ({
  'is-loading': props.loading,
  ...hasIconsClasses.value,
  ...sizeClass.value
}))

export const inputClasses = computed(() => ({
  'is-rounded': props.rounded,
  'is-static': props.static,
  ...isColorClass.value,
  ...sizeClass.value
}))

export default {
  name: 'BField'
}
</script>
