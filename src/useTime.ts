import { Time } from './utils'
import { useInterval } from './hooks'
import { ref, Ref } from 'vue'

export interface TimeOption {
  format: '12-hour' | '24-hour'
}
export interface ResUseTime {
  seconds: Ref<number>
  minutes: Ref<number>
  hours: Ref<number>
  ampm: Ref<string>
}

export const useTime = (
  format: '12-hour' | '24-hour' = '24-hour'
): ResUseTime => {
  const seconds = ref(Time.getSecondsFromTimeNow())

  useInterval(() => {
    seconds.value = Time.getSecondsFromTimeNow()
  }, 1000)

  return {
    ...Time.getFormattedTimeFromSeconds(seconds, format),
  }
}
