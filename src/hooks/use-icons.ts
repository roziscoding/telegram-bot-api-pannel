import { computed } from 'vue'

export type IconsProps = {
  iconLeft?: string
  iconRight?: string
  size?: 'small' | 'medium' | 'large'
}

export const useIcons = (props: IconsProps) => {
  const hasIconsClasses = computed(() => ({
    'has-icons-left': !!props.iconLeft,
    'has-icons-right': !!props.iconRight
  }))

  const iconSpanClasses = computed(() => ({
    [`is-${props.size}`]: !!props.size
  }))

  return {
    hasIconsClasses,
    iconSpanClasses
  }
}
