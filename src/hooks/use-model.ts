import { SetupContext } from 'vue'

type HTMLInputEvent = Event & { target: HTMLInputElement }

export const useModel = (
  emit: SetupContext['emit'],
  propName = 'modelValue'
) => {
  const updateProp = (e: HTMLInputEvent) => {
    emit(
      `update:${propName}`,
      ['checkbox', 'radio'].includes(e.target.type)
        ? e.target.checked
        : e.target.value
    )
  }

  return updateProp
}
