const isNumber = (val: unknown): val is number => typeof val === 'number'

export interface Interval {
  remove: () => void
  start: (_ms?: number | undefined) => NodeJS.Timeout | undefined
}

export function useInterval(
  callback: () => void,
  ms?: number | boolean | null
): Interval {
  let intervalId: NodeJS.Timeout | undefined = undefined

  const remove = () => {
    if (!intervalId) return
    clearInterval(intervalId)
    intervalId = undefined
  }

  const start = (_ms?: number) => {
    remove()
    if (!_ms && !ms) {
      return
    }
    const m = (_ms || ms) as number
    return (intervalId = setInterval(callback, m))
  }

  if (isNumber(ms)) {
    start()
  }

  return { remove, start }
}
