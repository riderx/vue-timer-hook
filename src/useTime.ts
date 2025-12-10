import type { Ref } from 'vue'
import { ref, unref, watch } from 'vue'
import { useInterval } from './hooks'
import { Time } from './utils'

export interface TimeOption {
  format: '12-hour' | '24-hour'
}
export interface ResUseTime {
  seconds: Ref<number>
  minutes: Ref<number>
  hours: Ref<number>
  ampm: Ref<string>
}

export function useTime(format: '12-hour' | '24-hour' | Ref<'12-hour' | '24-hour'> = '24-hour'): ResUseTime {
  const formatValue = ref(unref(format))
  const seconds = ref(Time.getSecondsFromTimeNow())

  useInterval(() => {
    seconds.value = Time.getSecondsFromTimeNow()
  }, 1000)

  // Watch for changes if format is a ref
  if (typeof format === 'object' && 'value' in format) {
    watch(format, (newFormat) => {
      formatValue.value = newFormat
    })
  }

  return {
    ...Time.getFormattedTimeFromSeconds(seconds, formatValue.value),
  }
}
