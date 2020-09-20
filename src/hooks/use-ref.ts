import { ref, UnwrapRef } from 'vue'

export const useRef = <TValue>(initialValue: TValue) => {
  const createdRef = ref(initialValue)

  const setRef = (newValue: TValue) => {
    createdRef.value = newValue as UnwrapRef<TValue>
  }

  return [createdRef, setRef]
}
