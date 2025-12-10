import type { Ref } from 'vue'
import type { Interval } from './hooks/useInterval'
import { ref, unref, watch } from 'vue'
import { useInterval } from './hooks'
import { Time } from './utils'

const epochSeconds = () => new Date().getTime()
export interface ResUseStopwatch {
  seconds: Ref<number>
  minutes: Ref<number>
  hours: Ref<number>
  days: Ref<number>
  start: () => void
  pause: () => void
  reset: (offset?: number | Ref<number>, newAutoStart?: boolean) => void
  isRunning: Ref<boolean>
}

export function useStopwatch(offsetTimestamp: number | Ref<number> = 60, autoStart: boolean | Ref<boolean> = true): ResUseStopwatch {
  let interval: Interval
  const offsetValue = unref(offsetTimestamp)
  const autoStartValue = unref(autoStart)

  const passedSeconds = ref(offsetValue)

  const prevTime = ref(epochSeconds())
  const seconds = ref(
    passedSeconds.value + Time.getSecondsFromPrevTime(prevTime.value || 0, true),
  )
  const isRunning = ref(autoStartValue)

  function start() {
    prevTime.value = epochSeconds()
    isRunning.value = true
    seconds.value
      = passedSeconds.value + Time.getSecondsFromPrevTime(prevTime.value, true)
    interval = useInterval(
      () => {
        seconds.value
          = passedSeconds.value
            + Time.getSecondsFromPrevTime(prevTime.value, true)
      },
      isRunning.value ? 1000 : false,
    )
  }

  function pause() {
    passedSeconds.value = seconds.value
    isRunning.value = false
    if (interval)
      interval.remove()
  }

  function reset(offset: number | Ref<number> = 0, newAutoStart = true) {
    const offsetValue = unref(offset)
    pause()
    isRunning.value = newAutoStart
    passedSeconds.value = offsetValue
    seconds.value = +passedSeconds.value
    Time.getSecondsFromPrevTime(prevTime.value, true)
    if (isRunning.value)
      start()
  }

  // Watch for changes if offsetTimestamp is a ref
  if (typeof offsetTimestamp === 'object' && 'value' in offsetTimestamp) {
    watch(offsetTimestamp, (newOffset) => {
      reset(newOffset, isRunning.value)
    })
  }

  if (isRunning.value)
    start()
  return {
    ...Time.getTimeFromSeconds(seconds),
    start,
    pause,
    reset,
    isRunning,
  }
}
