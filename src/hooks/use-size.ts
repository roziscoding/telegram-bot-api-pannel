import { computed } from 'vue'

export type SizeProps = {
  size?: 'small' | 'medium' | 'large'
}

export const useSize = (props: SizeProps) => {
  const sizeClass = computed(() => ({
    [`is-${props.size}`]: !!props.size
  }))

  return { sizeClass }
}
