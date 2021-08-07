// import { useState } from 'react';
import { ref } from 'vue'
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

interface TimerOption {
  expiryTimestamp: number
  autoStart: boolean
}

export default function useTimer({
  expiryTimestamp: expiry,
  autoStart = true,
}: TimerOption) {
  const expiryTimestamp = ref(expiry)
  const seconds = ref(Time.getSecondsFromExpiry(expiryTimestamp.value))
  const isRunning = ref(autoStart)
  const didStart = ref(autoStart)
  const delay = ref(getDelayFromExpiryTimestamp(expiryTimestamp.value))
  let onExpireResolve: (value: unknown) => void
  const onExpire = new Promise((resolve) => {
    onExpireResolve = resolve
  })

  function handleExpire() {
    // onExpirer
    onExpireResolve(null)
    isRunning.value = false
    delay.value = null
  }

  function pause() {
    isRunning.value = false
  }

  function restart(newExpiryTimestamp: number, newAutoStart = true) {
    delay.value = getDelayFromExpiryTimestamp(newExpiryTimestamp)
    didStart.value = newAutoStart
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
        handleExpire()
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
    onExpire,
  }
}
