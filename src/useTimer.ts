// import { useState } from 'react';
import { Ref, ref } from 'vue'
import { Time, Validate } from './utils'
import { useInterval } from './hooks'

const DEFAULT_DELAY = 1000
function getDelayFromExpiryTimestamp(expiryTimestamp: number) {
  if (!Validate.expiryTimestamp(expiryTimestamp)) {
    return null
  }

  const seconds = Time.getSecondsFromExpiry(expiryTimestamp)
  const extraMilliSeconds = Math.floor((seconds - Math.floor(seconds)) * 1000)
  return extraMilliSeconds > 0 ? extraMilliSeconds : DEFAULT_DELAY
}

export interface UseTimer {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  start(): void;
  pause(): void;
  resume(): void;
  restart(newExpiryTimestamp: number, newAutoStart: boolean): void;
  isRunning: Ref<boolean>;
  isExpired: Ref<boolean>;
}

export const useTimer = (
  expiry = 60,
  autoStart = true): UseTimer => {
  const expiryTimestamp = ref(expiry)
  const seconds = ref(Time.getSecondsFromExpiry(expiryTimestamp.value))
  const isRunning = ref(autoStart)
  const isExpired = ref(false)
  const didStart = ref(autoStart)
  const delay = ref(getDelayFromExpiryTimestamp(expiryTimestamp.value))

  function _handleExpire() {
    isExpired.value = true
    isRunning.value = false
    delay.value = null
  }

  function pause() {
    isRunning.value = false
  }

  function restart(newExpiryTimestamp: number, newAutoStart = true) {
    delay.value = getDelayFromExpiryTimestamp(newExpiryTimestamp)
    didStart.value = newAutoStart
    isExpired.value = false
    isRunning.value = newAutoStart
    expiryTimestamp.value = newExpiryTimestamp
    seconds.value = Time.getSecondsFromExpiry(newExpiryTimestamp)
  }

  function resume() {
    const time = new Date()
    time.setMilliseconds(time.getMilliseconds() + seconds.value * 1000)
    restart(time.getTime())
  }

  function start() {
    if (didStart) {
      seconds.value = Time.getSecondsFromExpiry(expiryTimestamp.value)
      isRunning.value = true
    } else {
      resume()
    }
  }

  useInterval(
    () => {
      if (delay.value !== DEFAULT_DELAY) {
        delay.value = DEFAULT_DELAY
      }
      const secondsValue = Time.getSecondsFromExpiry(expiryTimestamp.value)
      seconds.value = secondsValue
      if (secondsValue <= 0) {
        _handleExpire()
      }
    },
    isRunning.value ? delay.value : null
  )

  return {
    ...Time.getTimeFromSeconds(seconds.value),
    start,
    pause,
    resume,
    restart,
    isRunning,
    isExpired,
  }
}
