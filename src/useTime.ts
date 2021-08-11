import { ref } from 'vue'
import { Time } from './utils'
import { useInterval } from './hooks'

export interface TimeOption {
  format: string
}
export const useTime = ({ format }: TimeOption) => {
  const seconds = ref(Time.getSecondsFromTimeNow())

  useInterval(() => {
    seconds.value = Time.getSecondsFromTimeNow()
  }, 1000)

  return {
    ...Time.getFormattedTimeFromSeconds(seconds.value, format),
  }
}
