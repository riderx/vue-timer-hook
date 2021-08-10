import { ref } from 'vue'
import { Time } from './utils'
import { useInterval } from './hooks'

export interface StopwatchOption {
  autoStart: boolean
  offsetTimestamp: number
}
const epochSeconds = () => new Date().getTime()

export function useStopwatch({ autoStart, offsetTimestamp }: StopwatchOption) {
  const passedSeconds = ref(
    Time.getSecondsFromExpiry(offsetTimestamp, true) || 0
  )
  const prevTime = ref(epochSeconds())
  const seconds = ref(
    passedSeconds.value + Time.getSecondsFromPrevTime(prevTime.value || 0, true)
  )
  const isRunning = ref(autoStart)

  useInterval(
    () => {
      seconds.value =
        passedSeconds.value + Time.getSecondsFromPrevTime(prevTime.value, true)
    },
    isRunning.value ? 1000 : false
  )

  function start() {
    const newPrevTime = epochSeconds()
    prevTime.value = newPrevTime
    isRunning.value = true
    seconds.value =
      passedSeconds.value + Time.getSecondsFromPrevTime(newPrevTime, true)
  }

  function pause() {
    passedSeconds.value = seconds.value
    isRunning.value = false
  }

  function reset(offset = 0, newAutoStart = true) {
    const newPassedSeconds = Time.getSecondsFromExpiry(offset, true) || 0
    const newPrevTime = epochSeconds()
    prevTime.value = newPrevTime
    passedSeconds.value = newPassedSeconds
    isRunning.value = newAutoStart
    seconds.value =
      newPassedSeconds + Time.getSecondsFromPrevTime(newPrevTime, true)
  }

  return {
    ...Time.getTimeFromSeconds(seconds.value),
    start,
    pause,
    reset,
    isRunning,
  }
}
