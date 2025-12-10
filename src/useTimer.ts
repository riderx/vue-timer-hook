// import { useState } from 'react';
import type { Ref } from 'vue'
import type { Interval } from './hooks/useInterval'
import { reactive, toRef, unref, watch } from 'vue'
import { useInterval } from './hooks'
import { Time, Validate } from './utils'

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
  seconds: Ref<number>
  minutes: Ref<number>
  hours: Ref<number>
  days: Ref<number>
  start: () => void
  pause: () => void
  resume: () => void
  restart: (newExpiryTimestamp?: number | Ref<number>, newAutoStart?: boolean) => void
  isRunning: Ref<boolean>
  isExpired: Ref<boolean>
}

export function useTimer(expiry: number | Ref<number> = 60, autoStart: boolean | Ref<boolean> = true): UseTimer {
  let interval: Interval
  const expiryValue = unref(expiry)
  const autoStartValue = unref(autoStart)

  const state = reactive({
    expiryTimestamp: expiryValue,
    seconds: Time.getSecondsFromExpiry(expiryValue),
    isRunning: autoStartValue,
    isExpired: false,
    didStart: autoStartValue,
    delay: getDelayFromExpiryTimestamp(expiryValue),
  })

  function _handleExpire() {
    state.isExpired = true
    state.isRunning = false
    state.delay = null
    if (interval)
      interval.remove()
  }

  function pause() {
    state.isRunning = false
    if (interval)
      interval.remove()
  }

  function restart(newExpiryTimestamp: number | Ref<number> = expiryValue, newAutoStart = true) {
    const newExpiryValue = unref(newExpiryTimestamp)
    pause()
    state.delay = getDelayFromExpiryTimestamp(newExpiryValue)
    state.didStart = newAutoStart
    state.isExpired = false
    state.expiryTimestamp = newExpiryValue
    state.seconds = Time.getSecondsFromExpiry(newExpiryValue)
    if (state.didStart)
      start()
  }

  function resume() {
    const time = new Date()
    const newExpiryTimestamp = time.setMilliseconds(
      time.getMilliseconds() + state.seconds * 1000,
    )
    restart(newExpiryTimestamp)
  }

  function start() {
    if (state.didStart) {
      state.seconds = Time.getSecondsFromExpiry(state.expiryTimestamp)
      state.isRunning = true
      interval = useInterval(
        () => {
          if (state.delay !== DEFAULT_DELAY) {
            state.delay = DEFAULT_DELAY
          }
          const secondsValue = Time.getSecondsFromExpiry(state.expiryTimestamp)
          state.seconds = secondsValue
          if (secondsValue <= 0) {
            _handleExpire()
          }
        },
        state.isRunning ? state.delay : null,
      )
    }
    else {
      resume()
    }
  }

  restart(expiryValue, autoStartValue)

  // Watch for changes if expiry is a ref
  if (typeof expiry === 'object' && 'value' in expiry) {
    watch(expiry, (newExpiry) => {
      restart(newExpiry, state.isRunning)
    })
  }

  return {
    ...Time.getTimeFromSeconds(toRef(state, 'seconds')),
    start,
    pause,
    resume,
    restart,
    isRunning: toRef(state, 'isRunning'),
    isExpired: toRef(state, 'isExpired'),
  }
}
