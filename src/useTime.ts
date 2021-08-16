import { Time } from './utils'
import { useInterval } from './hooks'
import { Ref } from 'vue'

export interface TimeOption {
  format: '12-hour' | '24-hour';
}
export interface ResUseTime {
  seconds: Ref<number>;
  minutes: Ref<number>;
  hours: Ref<number>;
  ampm: Ref<string>;
}

export const useTime = (format: '12-hour' | '24-hour' = '24-hour'): ResUseTime => {
  const seconds = Time.getSecondsFromTimeNow()

  useInterval(() => {
    seconds.value = Time.getSecondsFromTimeNow().value
  }, 1000)

  return {
    ...Time.getFormattedTimeFromSeconds(seconds, format),
  }
}
