import { SetupContext } from 'vue'

type HTMLInputEvent = Event & { target: HTMLInputElement }

const getInputValue = (e: HTMLInputEvent): any => {
  if (!e.target) return e

  return ['checkbox', 'radio'].includes(e.target.type) ? e.target.checked : e.target.value
}

export const useModel = (
  emit: SetupContext['emit'],
  propName = 'modelValue',
  getValue = getInputValue
) => {
  const updateProp = (e: HTMLInputEvent) => {
    const value = getValue(e)
    emit(`update:${propName}`, value)
  }

  return updateProp
}
