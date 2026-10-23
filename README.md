## vue-timer-hook

Vue 3 composition API hooks for countdown timers, stopwatches, and live clock state.

| Hook           | Purpose                                           |
| -------------- | ------------------------------------------------- |
| `useTimer`     | Countdown to an expiry timestamp (ms since epoch) |
| `useStopwatch` | Count up from an optional offset                  |
| `useTime`      | Current local time, 24h or 12h format             |

[Live demo](https://cap-go.github.io/vue-timer-hook/)

---

## Install

```bash
bun add vue-timer-hook
# or
pnpm add vue-timer-hook
# or
yarn add vue-timer-hook
# or
npm install vue-timer-hook
```

Peer dependency: `vue` ^3.2.0.

---

## `useTimer`

Counts down to `expiryTimestamp` (a **number**: milliseconds since Unix epoch, same as `Date.now()`).

### Example

```vue
<script setup lang="ts">
import { watchEffect } from 'vue'
import { useTimer } from 'vue-timer-hook'

const expiryTimestamp = Date.now() + 10 * 60 * 1000
const timer = useTimer(expiryTimestamp)

function restartFive() {
  timer.restart(Date.now() + 5 * 60 * 1000)
}

watchEffect(() => {
  if (timer.isExpired.value) {
    console.warn('Timer expired')
  }
})
</script>

<template>
  <div>
    <p>
      {{ timer.days }}:{{ timer.hours }}:{{ timer.minutes }}:{{ timer.seconds }}
    </p>
    <p>{{ timer.isRunning ? 'Running' : 'Paused' }}</p>
    <button type="button" @click="timer.pause()">
      Pause
    </button>
    <button type="button" @click="timer.resume()">
      Resume
    </button>
    <button type="button" @click="restartFive()">
      Restart 5 min
    </button>
  </div>
</template>
```

### Options

| Argument          | Type                        | Default                                       | Description                     |
| ----------------- | --------------------------- | --------------------------------------------- | ------------------------------- |
| `expiryTimestamp` | `number` or `Ref<number>`   | `60` (invalid default; pass a real timestamp) | When the countdown reaches zero |
| `autoStart`       | `boolean` or `Ref<boolean>` | `true`                                        | Start ticking immediately       |

### Return value

| Property                              | Type                                        | Description                            |
| ------------------------------------- | ------------------------------------------- | -------------------------------------- |
| `seconds`, `minutes`, `hours`, `days` | `Ref<number>`                               | Remaining time parts                   |
| `isRunning`                           | `Ref<boolean>`                              | Timer is actively ticking              |
| `isExpired`                           | `Ref<boolean>`                              | Countdown finished                     |
| `start()`                             | `() => void`                                | Start or continue from expiry          |
| `pause()`                             | `() => void`                                | Pause                                  |
| `resume()`                            | `() => void`                                | Resume from remaining time after pause |
| `restart(expiry?, autoStart?)`        | `(number \| Ref<number>, boolean?) => void` | Reset expiry and optionally auto-start |

---

## `useStopwatch`

Counts up from an optional offset in seconds.

### Example

```vue
<script setup lang="ts">
import { useStopwatch } from 'vue-timer-hook'

const stopwatch = useStopwatch(0, true)
</script>

<template>
  <div>
    <p>
      {{ stopwatch.hours }}:{{ stopwatch.minutes }}:{{ stopwatch.seconds }}
    </p>
    <button type="button" @click="stopwatch.pause()">
      Pause
    </button>
    <button type="button" @click="stopwatch.start()">
      Start
    </button>
    <button type="button" @click="stopwatch.reset()">
      Reset
    </button>
  </div>
</template>
```

### Options

| Argument          | Type                        | Default | Description             |
| ----------------- | --------------------------- | ------- | ----------------------- |
| `offsetTimestamp` | `number` or `Ref<number>`   | `60`    | Initial elapsed seconds |
| `autoStart`       | `boolean` or `Ref<boolean>` | `true`  | Start immediately       |

### Return value

| Property                              | Type                                        | Description                             |
| ------------------------------------- | ------------------------------------------- | --------------------------------------- |
| `seconds`, `minutes`, `hours`, `days` | `Ref<number>`                               | Elapsed time parts                      |
| `isRunning`                           | `Ref<boolean>`                              | Stopwatch is ticking                    |
| `start()`                             | `() => void`                                | Start or resume                         |
| `pause()`                             | `() => void`                                | Pause                                   |
| `reset(offset?, autoStart?)`          | `(number \| Ref<number>, boolean?) => void` | Reset offset; default auto-start `true` |

---

## `useTime`

Live clock updated every second.

### Example

```vue
<script setup lang="ts">
import { useTime } from 'vue-timer-hook'

const time = useTime('12-hour')
</script>

<template>
  <p>{{ time.hours }}:{{ time.minutes }}:{{ time.seconds }}{{ time.ampm }}</p>
</template>
```

### Options

| Argument | Type                                   | Default     | Description    |
| -------- | -------------------------------------- | ----------- | -------------- |
| `format` | `'12-hour' \| '24-hour'` or `Ref<...>` | `'24-hour'` | Display format |

### Return value

| Property                      | Type          | Description                                          |
| ----------------------------- | ------------- | ---------------------------------------------------- |
| `seconds`, `minutes`, `hours` | `Ref<number>` | Current time parts                                   |
| `ampm`                        | `Ref<string>` | `'am'` / `'pm'` when using 12-hour format, else `''` |

---

## Development

```bash
bun install
bun run dev          # demo site
bun run build        # library dist (ESM + CJS + IIFE)
bun run build:dts    # roll up .d.ts
bun run verify:build # build + types + dist smoke tests
bun run test         # typecheck + unit tests
```

---

### Credit

Inspired by [react-timer-hook](https://github.com/amrlabib/react-timer-hook).
