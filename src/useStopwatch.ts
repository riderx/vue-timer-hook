import { Ref, ref } from 'vue'
import { Time } from './utils'
import { useInterval } from './hooks'
import { Interval } from './hooks/useInterval'

const epochSeconds = () => new Date().getTime()
export interface ResUseStopwatch {
  seconds: Ref<number>
  minutes: Ref<number>
  hours: Ref<number>
  days: Ref<number>
  start(): void
  pause(): void
  reset(offset: number, newAutoStart: boolean): void
  isRunning: Ref<boolean>
}

export const useStopwatch = (
  offsetTimestamp: number = 60,
  autoStart: boolean = true
): ResUseStopwatch => {
  let interval: Interval
  const passedSeconds = ref(offsetTimestamp)

  const prevTime = ref(epochSeconds())
  const seconds = ref(
    passedSeconds.value + Time.getSecondsFromPrevTime(prevTime.value || 0, true)
  )
  const isRunning = ref(autoStart)

  function start() {
    prevTime.value = epochSeconds()
    isRunning.value = true
    seconds.value =
      passedSeconds.value + Time.getSecondsFromPrevTime(prevTime.value, true)
    interval = useInterval(
      () => {
        seconds.value =
          passedSeconds.value +
          Time.getSecondsFromPrevTime(prevTime.value, true)
      },
      isRunning.value ? 1000 : false
    )
  }

  function pause() {
    passedSeconds.value = seconds.value
    isRunning.value = false
    if (interval) interval.remove()
  }

  function reset(offset = 0, newAutoStart = true) {
    pause()
    isRunning.value = newAutoStart
    passedSeconds.value = offset
    seconds.value = +passedSeconds.value
    Time.getSecondsFromPrevTime(prevTime.value, true)
    if (isRunning.value) start()
  }

  if (isRunning.value) start()
  return {
    ...Time.getTimeFromSeconds(seconds),
    start,
    pause,
    reset,
    isRunning,
  }
}
