import { Ref, ref, toRefs } from 'vue'
import { Time } from './utils'
import { useInterval } from './hooks'
import { Interval } from './hooks/useInterval'

export interface StopwatchOption {
  autoStart: boolean;
  offsetTimestamp: number;
}
const epochSeconds = () => new Date().getTime()

export interface ResUseStopwatch {
  seconds: Ref<number>;
  minutes: Ref<number>;
  hours: Ref<number>;
  days: Ref<number>;
  start(): void;
  pause(): void;
  reset(offset: number, newAutoStart: boolean): void;
  isRunning: Ref<boolean>;
}

export const useStopwatch = (
  autoStart = true,
  offsetTimestamp: number): ResUseStopwatch => {
  let interval: Interval;
  const passedSeconds = ref(
    Time.getSecondsFromExpiry(offsetTimestamp, true) || 0
  )
  const prevTime = ref(epochSeconds())
  const seconds = ref(
    passedSeconds.value + Time.getSecondsFromPrevTime(prevTime.value || 0, true).value
  )
  const isRunning = ref(autoStart)



  function start() {
    const newPrevTime = epochSeconds()
    prevTime.value = newPrevTime
    isRunning.value = true
    seconds.value =
      passedSeconds.value + Time.getSecondsFromPrevTime(newPrevTime, true).value
    interval = useInterval(
        () => {
          seconds.value =
            passedSeconds.value + Time.getSecondsFromPrevTime(prevTime.value, true).value
        },
        isRunning.value ? 1000 : false
      )
  }

  function pause() {
    passedSeconds.value = seconds.value
    isRunning.value = false
    if (interval) interval.remove();
  }

  function reset(offset = 0, newAutoStart = true) {
    isRunning.value = newAutoStart
    passedSeconds.value  = Time.getSecondsFromExpiry(offset, true).value || 0
    start()
  }

  return {
    ...Time.getTimeFromSeconds(seconds),
    start,
    pause,
    reset,
    isRunning,
  }
}
