import { useTimer, useTime } from './index'
import MockDate from 'mockdate'

beforeEach(() => {
  jest.useFakeTimers()
  MockDate.set(1628693892000)
})

afterEach(() => {
  jest.useRealTimers()
  MockDate.reset()
});

test('init value useTime 24-hour', () => {
  const { seconds, minutes, hours, ampm } = useTime()
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  expect(seconds).toBe(12)
  expect(minutes).toBe(58)
  expect(hours).toBe(16)
  expect(ampm).toBe('')
});

test('init value useTime 12-hour', () => {
  const { seconds, minutes, hours, ampm } = useTime('12-hour')
  expect(seconds).toBe(12)
  expect(minutes).toBe(58)
  expect(hours).toBe(4)
  expect(ampm).toBe('pm')
});

test('run useTime for 3', async () => {
  const { seconds, minutes, hours, ampm } = useTime()
  expect(seconds).toBe(12)
  expect(minutes).toBe(58)
  expect(hours).toBe(16)
  expect(ampm).toBe('')
  jest.advanceTimersByTime(1000)
  expect(setInterval).toHaveBeenCalledTimes(1);
  MockDate.set(1638693892000)
  expect(seconds).toBe(13)
  expect(minutes).toBe(58)
  expect(hours).toBe(16)
  expect(ampm).toBe('')
});

test('init value useTimer', () => {
  const { seconds, minutes, hours, isRunning } = useTimer(60, false);
  expect(seconds).toBe(0)
  expect(minutes).toBe(0)
  expect(hours).toBe(0)
  expect(isRunning.value).toBe(false)
});

// test('run useTimer for 6', async () => {
//   jest.useFakeTimers()
//   MockDate.set(1628693892000)
//   const { seconds, minutes, hours, isRunning, pause } = useTimer(6)
//   expect(isRunning.value).toBe(true)
//   jest.advanceTimersByTime(3000)
//   expect(setInterval).toHaveBeenCalledTimes(3);
//   MockDate.set(1638693892000)
//   // jest.runOnlyPendingTimers()
//   pause()
//   expect(isRunning.value).toBe(false)
//   expect(seconds).toBe(3)
//   expect(minutes).toBe(0)
//   expect(hours).toBe(0)
// });
