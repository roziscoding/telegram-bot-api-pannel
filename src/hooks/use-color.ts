import { computed } from 'vue'

export type ColorProps = {
  color?: string
  textColor?: string
  backgroundColor?: string
}

export const useColor = (props: ColorProps) => {
  const isColorClass = computed(() => ({
    [`is-${props.color}`]: !!props.color
  }))

  const hasTextClass = computed(() => ({
    [`has-text-${props.textColor}`]: !!props.textColor
  }))

  const hasBackgroundClass = computed(() => ({
    [`has-background-${props.backgroundColor}`]: !!props.backgroundColor
  }))

  return {
    isColorClass,
    hasTextClass,
    hasBackgroundClass
  }
}
