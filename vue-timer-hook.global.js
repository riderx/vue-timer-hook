/*!
  * vue-timer-hook v0.0.13
  * (c) 2021 Eduardo San Martin Morote
  * @license MIT
  */
var VueRouter = (function (exports, vue) {
  'use strict';

  class Time {
      static getTimeFromSeconds(secs) {
          const totalSeconds = vue.computed(() => Math.ceil(secs.value));
          const days = vue.computed(() => Math.floor(totalSeconds.value / (60 * 60 * 24)));
          const hours = vue.computed(() => Math.floor((totalSeconds.value % (60 * 60 * 24)) / (60 * 60)));
          const minutes = vue.computed(() => Math.floor((totalSeconds.value % (60 * 60)) / 60));
          const seconds = vue.computed(() => Math.floor(totalSeconds.value % 60));
          return {
              seconds,
              minutes,
              hours,
              days,
          };
      }
      static getSecondsFromExpiry(expiry, shouldRound) {
          const now = new Date().getTime();
          const milliSecondsDistance = expiry - now;
          if (milliSecondsDistance > 0) {
              const val = milliSecondsDistance / 1000;
              return vue.ref(shouldRound ? Math.round(val) : val);
          }
          return vue.ref(0);
      }
      static getSecondsFromPrevTime(prevTime, shouldRound) {
          const now = new Date().getTime();
          const milliSecondsDistance = now - prevTime;
          if (milliSecondsDistance > 0) {
              const val = milliSecondsDistance / 1000;
              return vue.ref(shouldRound ? Math.round(val) : val);
          }
          return vue.ref(0);
      }
      static getSecondsFromTimeNow() {
          const now = new Date();
          const currentTimestamp = now.getTime();
          const offset = now.getTimezoneOffset() * 60;
          return vue.ref(currentTimestamp / 1000 - offset);
      }
      static getFormattedTimeFromSeconds(totalSeconds, format) {
          const { seconds: secondsValue, minutes, hours, } = Time.getTimeFromSeconds(totalSeconds);
          const ampm = vue.computed(() => format === '12-hour' ? (hours.value >= 12 ? 'pm' : 'am') : '');
          const hoursValue = vue.computed(() => format === '12-hour' ? hours.value % 12 : hours.value);
          return {
              seconds: secondsValue,
              minutes,
              hours: hoursValue,
              ampm,
          };
      }
  }

  class Validate {
      static expiryTimestamp(expiryTimestamp) {
          const isValid = new Date(expiryTimestamp).getTime() > 0;
          if (!isValid) {
              console.warn('vue-timer-hook: { useTimer } Invalid expiryTimestamp settings', expiryTimestamp); // eslint-disable-line
          }
          return isValid;
      }
      static onExpire(onExpire) {
          const isValid = onExpire && typeof onExpire === 'function';
          if (onExpire && !isValid) {
              console.warn('vue-timer-hook: { useTimer } Invalid onExpire settings function', onExpire); // eslint-disable-line
          }
          return isValid;
      }
  }

  const isNumber = (val) => typeof val === 'number';
  function useInterval(callback, ms) {
      let intervalId = undefined;
      const remove = () => {
          if (!intervalId)
              return;
          clearInterval(intervalId);
          intervalId = undefined;
      };
      const start = (_ms) => {
          remove();
          if (!_ms && !ms) {
              return;
          }
          const m = (_ms || ms);
          return (intervalId = setInterval(callback, m));
      };
      if (isNumber(ms)) {
          start();
      }
      vue.onUnmounted(remove);
      return { remove, start };
  }

  // import { useState } from 'react';
  const DEFAULT_DELAY = 1000;
  function getDelayFromExpiryTimestamp(expiryTimestamp) {
      if (!Validate.expiryTimestamp(expiryTimestamp)) {
          return null;
      }
      const seconds = Time.getSecondsFromExpiry(expiryTimestamp);
      const extraMilliSeconds = Math.floor((seconds.value - Math.floor(seconds.value)) * 1000);
      return extraMilliSeconds > 0 ? extraMilliSeconds : DEFAULT_DELAY;
  }
  const useTimer = (expiry = 60, autoStart = true) => {
      let interval;
      const state = vue.reactive({
          expiryTimestamp: expiry,
          seconds: Time.getSecondsFromExpiry(expiry),
          isRunning: autoStart,
          isExpired: false,
          didStart: autoStart,
          delay: getDelayFromExpiryTimestamp(expiry)
      });
      function _handleExpire() {
          state.isExpired = true;
          state.isRunning = false;
          state.delay = null;
          if (interval)
              interval.remove();
      }
      function pause() {
          state.isRunning = false;
          if (interval)
              interval.remove();
      }
      function restart(newExpiryTimestamp = expiry, newAutoStart = true) {
          state.delay = getDelayFromExpiryTimestamp(newExpiryTimestamp);
          state.didStart = newAutoStart;
          state.isExpired = false;
          state.isRunning = newAutoStart;
          state.expiryTimestamp = newExpiryTimestamp;
          state.seconds = Time.getSecondsFromExpiry(newExpiryTimestamp).value;
          interval = useInterval(() => {
              if (state.delay !== DEFAULT_DELAY) {
                  state.delay = DEFAULT_DELAY;
              }
              const secondsValue = Time.getSecondsFromExpiry(state.expiryTimestamp);
              state.seconds = secondsValue.value;
              if (secondsValue.value <= 0) {
                  _handleExpire();
              }
          }, state.isRunning ? state.delay : null);
      }
      function resume() {
          const time = new Date();
          time.setMilliseconds(time.getMilliseconds() + state.seconds * 1000);
          restart(time.getTime());
      }
      function start() {
          if (state.didStart) {
              state.seconds = Time.getSecondsFromExpiry(state.expiryTimestamp).value;
              state.isRunning = true;
          }
          else {
              resume();
          }
      }
      restart(expiry, autoStart);
      return {
          ...Time.getTimeFromSeconds(vue.toRef(state, 'seconds')),
          start,
          pause,
          resume,
          restart,
          isRunning: vue.toRef(state, 'isRunning'),
          isExpired: vue.toRef(state, 'isExpired'),
      };
  };

  const epochSeconds = () => new Date().getTime();
  const useStopwatch = (offsetTimestamp = 60, autoStart = true) => {
      let interval;
      const passedSeconds = vue.ref(Time.getSecondsFromExpiry(offsetTimestamp, true) || 0);
      const prevTime = vue.ref(epochSeconds());
      const seconds = vue.ref(passedSeconds.value +
          Time.getSecondsFromPrevTime(prevTime.value || 0, true).value);
      const isRunning = vue.ref(autoStart);
      function start() {
          const newPrevTime = epochSeconds();
          prevTime.value = newPrevTime;
          isRunning.value = true;
          seconds.value =
              passedSeconds.value + Time.getSecondsFromPrevTime(newPrevTime, true).value;
          interval = useInterval(() => {
              seconds.value =
                  passedSeconds.value +
                      Time.getSecondsFromPrevTime(prevTime.value, true).value;
          }, isRunning.value ? 1000 : false);
      }
      function pause() {
          passedSeconds.value = seconds.value;
          isRunning.value = false;
          if (interval)
              interval.remove();
      }
      function reset(offset = 0, newAutoStart = true) {
          isRunning.value = newAutoStart;
          passedSeconds.value = Time.getSecondsFromExpiry(offset, true).value || 0;
          start();
      }
      return {
          ...Time.getTimeFromSeconds(seconds),
          start,
          pause,
          reset,
          isRunning,
      };
  };

  const useTime = (format = '24-hour') => {
      const seconds = Time.getSecondsFromTimeNow();
      useInterval(() => {
          seconds.value = Time.getSecondsFromTimeNow().value;
      }, 1000);
      return {
          ...Time.getFormattedTimeFromSeconds(seconds, format),
      };
  };

  exports.useStopwatch = useStopwatch;
  exports.useTime = useTime;
  exports.useTimer = useTimer;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, Vue));
