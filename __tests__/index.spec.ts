import { Validate } from '../src/utils'
import { useTimer, useTime, useStopwatch } from '../src/index'

beforeEach(() => {
  jest.useFakeTimers()
  jest.setSystemTime(1628693892000)
})

afterEach(() => {
  jest.useRealTimers()
})

describe('Timezones', () => {
    it('should always be UTC', () => {
        expect(new Date().getTimezoneOffset()).toBe(0);
    });
});

test('init value useTime 24-hour', () => {
  const time = useTime()
  expect(time.seconds.value).toBe(12)
  expect(time.minutes.value).toBe(58)
  expect(time.hours.value).toBe(14)
  expect(time.ampm.value).toBe('')
})

test('init value useTime 12-hour', () => {
  const time = useTime('12-hour')
  expect(time.seconds.value).toBe(12)
  expect(time.minutes.value).toBe(58)
  expect(time.hours.value).toBe(2)
  expect(time.ampm.value).toBe('pm')
})

test('run useTime', async () => {
  const time = useTime()
  expect(time.seconds.value).toBe(12)
  expect(time.minutes.value).toBe(58)
  expect(time.hours.value).toBe(14)
  expect(time.ampm.value).toBe('')
  jest.advanceTimersByTime(3 * 1000)
  expect(time.seconds.value).toBe(15)
  expect(time.minutes.value).toBe(58)
  expect(time.hours.value).toBe(14)
  expect(time.ampm.value).toBe('')
  jest.advanceTimersByTime(60 * 1000)
  expect(time.seconds.value).toBe(15)
  expect(time.minutes.value).toBe(59)
  expect(time.hours.value).toBe(14)
  expect(time.ampm.value).toBe('')
  jest.advanceTimersByTime(60 * 60 * 1000)
  expect(time.seconds.value).toBe(15)
  expect(time.minutes.value).toBe(59)
  expect(time.hours.value).toBe(15)
  expect(time.ampm.value).toBe('')
})

test('init value useStopwatch', () => {
  const stopwatch = useStopwatch(60, false)
  expect(stopwatch.isRunning.value).toBe(false)
  expect(stopwatch.seconds.value).toBe(0)
  expect(stopwatch.minutes.value).toBe(1)
  expect(stopwatch.hours.value).toBe(0)
})

test('run useStopwatch', () => {
  const stopwatch = useStopwatch(0)
  expect(stopwatch.isRunning.value).toBe(true)
  jest.advanceTimersByTime(3 * 1000)
  expect(stopwatch.seconds.value).toBe(3)
  expect(stopwatch.minutes.value).toBe(0)
  expect(stopwatch.hours.value).toBe(0)
  jest.advanceTimersByTime(60 * 1000)
  expect(stopwatch.seconds.value).toBe(3)
  expect(stopwatch.minutes.value).toBe(1)
  expect(stopwatch.hours.value).toBe(0)
  jest.advanceTimersByTime(60 * 60 * 1000)
  expect(stopwatch.seconds.value).toBe(3)
  expect(stopwatch.minutes.value).toBe(1)
  expect(stopwatch.hours.value).toBe(1)
  stopwatch.reset(6, false)
  expect(stopwatch.isRunning.value).toBe(false)
  expect(stopwatch.seconds.value).toBe(6)
  expect(stopwatch.minutes.value).toBe(0)
  expect(stopwatch.hours.value).toBe(0)
  stopwatch.reset(6, true)
  expect(stopwatch.isRunning.value).toBe(true)
})

test('start/stop useStopwatch', () => {
  const stopwatch = useStopwatch(60, false)
  stopwatch.start()
  expect(stopwatch.isRunning.value).toBe(true)
  jest.advanceTimersByTime(3 * 1000)
  expect(stopwatch.seconds.value).toBe(3)
  expect(stopwatch.minutes.value).toBe(1)
  expect(stopwatch.hours.value).toBe(0)
  expect(stopwatch.days.value).toBe(0)
  stopwatch.pause()
  jest.advanceTimersByTime(3 * 1000)
  expect(stopwatch.seconds.value).toBe(3)
  expect(stopwatch.minutes.value).toBe(1)
  expect(stopwatch.hours.value).toBe(0)
  expect(stopwatch.days.value).toBe(0)
})

test('init value useTimer', () => {
  const d = new Date().setSeconds(new Date().getSeconds() + 600)
  const timer = useTimer(d, false)
  expect(timer.seconds.value).toBe(0)
  expect(timer.minutes.value).toBe(10)
  expect(timer.hours.value).toBe(0)
  expect(timer.isRunning.value).toBe(false)
})

test('start/stop/resume useTimer', () => {
  const timer = useTimer()
  expect(timer.isRunning.value).toBe(true)
  timer.start()
  expect(timer.isRunning.value).toBe(true)
  timer.pause()
  expect(timer.isRunning.value).toBe(false)
  timer.resume()
  expect(timer.isRunning.value).toBe(true)
})

test('run useTimer for 6', () => {
  const d = new Date().setSeconds(new Date().getSeconds() + 600)
  const timer = useTimer(d)
  expect(timer.isRunning.value).toBe(true)
  jest.advanceTimersByTime(3 * 1000)
  expect(timer.seconds.value).toBe(57)
  expect(timer.minutes.value).toBe(9)
  expect(timer.hours.value).toBe(0)
})

test('pause useTimer for 6', () => {
  const d = new Date().setSeconds(new Date().getSeconds() + 600)
  const timer = useTimer(d)
  expect(timer.isRunning.value).toBe(true)
  timer.pause()
  expect(timer.isRunning.value).toBe(false)
  jest.advanceTimersByTime(3 * 1000)
  expect(timer.seconds.value).toBe(0)
  expect(timer.minutes.value).toBe(10)
  expect(timer.hours.value).toBe(0)
})

test('expire useTimer', () => {
  const timer = useTimer()
  expect(timer.isRunning.value).toBe(true)
  expect(timer.isExpired.value).toBe(false)
  jest.advanceTimersByTime(60 * 1000)
  expect(timer.seconds.value).toBe(0)
  expect(timer.minutes.value).toBe(0)
  expect(timer.hours.value).toBe(0)
  expect(timer.isRunning.value).toBe(false)
  expect(timer.isExpired.value).toBe(true)
})

it('calls console.warn if error param', () => {
  const consoleSpy = jest.spyOn(console, 'warn')
  useTimer(-10)
  expect(consoleSpy).toHaveBeenCalledWith(
    'vue-timer-hook: { useTimer } Invalid expiryTimestamp settings',
    -10
  )
  const valid = Validate.expiryTimestamp(-10)
  expect(valid).toBe(false)
})
