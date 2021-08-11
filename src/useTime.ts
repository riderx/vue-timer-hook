import { ref } from 'vue'
import { Time } from './utils'
import { useInterval } from './hooks'

export interface TimeOption {
  format: '12-hour' | '24-hour'
}
export interface useTime {
  seconds: number;
  minutes: number;
  hours: number;
  ampm: string;
}

export const useTime = (format: '12-hour' | '24-hour' = '24-hour'): useTime => {
  const seconds = ref(Time.getSecondsFromTimeNow())

  useInterval(() => {
    seconds.value = Time.getSecondsFromTimeNow()
  }, 1000)

  return {
    ...Time.getFormattedTimeFromSeconds(seconds.value, format),
  }
}
