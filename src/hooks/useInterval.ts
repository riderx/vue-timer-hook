import { onUnmounted } from 'vue'

const isNumber = (val: unknown): val is number => typeof val === 'number'

export interface UseIntervalReturn<TArgs extends Array<any> = []> {
  start(ms: number, ...args: TArgs): number

  remove(): void
}

// export interface UseIntervalReturnMs {
//   start(): number;
// }

// export interface UseIntervalReturnArgs<TArgs extends Array<any>> {
//   start(_: undefined, ...args: TArgs): number;
// }

export function useInterval<TArgs extends Array<any>>(
  callback: (...args: TArgs) => void,
  ms?: number | boolean | null
): UseIntervalReturn<TArgs> {
  let intervalId: number | undefined = undefined

  const start = (_ms?: number, ..._args: any[]) => {
    remove()
    if (!_ms && !ms) {
      return
    }
    const m = (_ms || ms) as number
    return (intervalId = setInterval(
      callback,
      m
      // ...(_args && _args.length ? _args : args)
    ) as any)
  }

  const remove = () => {
    if (!intervalId) return
    clearInterval(intervalId)
    intervalId = undefined
  }

  if (isNumber(ms)) {
    start()
  }

  onUnmounted(remove)
  return { remove, start }
}
