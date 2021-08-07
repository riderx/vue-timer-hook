## vue-timer-hook

Vue timer hook is a custom [vue 3 hook](https://vue.org/docs/hooks-intro.html), built to handle timer, stopwatch, and time logic/state in your vue component.

1. `useTimer`: Timers (countdown timer)
2. `useStopwatch`: Stopwatch (count up timer)
3. `useTime`: Time (return current time)

---

## Setup

`yarn add vue-timer-hook` OR `npm install vue-timer-hook`

---

## `useTimer` - [Demo](https://amrlabib.github.io/vue-timer-hook/)

### Example

```html
<template>
    <div>
        <h1>vue-timer-hook </h1>
        <p>Timer Demo</p>
        <div>
            <span>{{days}}</span>:<span>{{hours}}</span>:<span>{{minutes}}</span>:<span>{{seconds}}</span>
        </div>
        <p>{{isRunning ? 'Running' : 'Not running'}}</p>
        <button @click="start()">Start</button>
        <button @click="pause()">Pause</button>
        <button @click="resume()">Resume</button>
        <button @click="restartFive()">Restart</button>
    </div>
</template>


<script lang="ts">
import { defineComponent, watchEffect } from "vue";
import { useTimer } from 'vue-timer-hook';

export default defineComponent({
  name: "Home",
  methods: {
      restartFive() {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        this.restart(time);
      }
  },
  mounted() {
    watch(isExpired, (isExpired, isExpiredCount) => {
        console.warn('IsExpired called :', isExpired.value)
    });
})
  },
  setup() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        isExpired
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp: time});
    return { 
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        isExpired,
        start,
        pause,
        resume,
        restart,
     };
  },
});
</script>
```

### Settings

| key | Type | Required | Description |
| --- | --- | --- | ---- |
| expiryTimestamp | number(timestamp) | YES | this will define for how long the timer will be running   |
| autoStart | boolean | No | flag to decide if timer should start automatically, by default it is set to `true` |
| onExpire | Function | No | callback function to be executed once countdown timer is expired |


### Values

| key | Type | Description |
| --- | --- | ---- |
| seconds | number | seconds value |
| minutes | number | minutes value |
| hours | number | hours value |
| days | number | days value |
| isRunning | boolean | flag to indicate if timer is running or not |
| pause | function | function to be called to pause timer |
| start | function | function if called after pause the timer will continue based on original expiryTimestamp |
| resume | function | function if called after pause the timer will continue countdown from last paused state |
| restart | function | function to restart timer with new expiryTimestamp, accept 2 arguments first is the new `expiryTimestamp` of type number(timestamp) and second is `autoStart` of type boolean to decide if it should automatically start after restart or not, default is `true` |


---

## `useStopwatch` - [Demo](https://amrlabib.github.io/vue-timer-hook/)

### Example


```html
<template>
    <div>
        <h1>vue-timer-hook </h1>
        <p>Stopwatch Demo</p>
        <div>
            <span>{{days}}</span>:<span>{{hours}}</span>:<span>{{minutes}}</span>:<span>{{seconds}}</span>
        </div>
        <p>{{isRunning ? 'Running' : 'Not running'}}</p>
        <button @click="start()">Start</button>
        <button @click="pause()">Pause</button>
        <button @click="reset()">Reset</button>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { useStopwatch } from 'vue-timer-hook';

export default defineComponent({
  name: "Home",
  setup() {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });
    return { 
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
     };
  },
});
```

### Settings

| key | Type | Required | Description |
| --- | --- | --- | ---- |
| autoStart | boolean | No | if set to `true` stopwatch will auto start, by default it is set to `false` |
| offsetTimestamp | number | No | this will define the initial stopwatch offset example: `const stopwatchOffset = new Date(); stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 300);` this will result in a 5 minutes offset and stopwatch will start from 0:0:5:0 instead of 0:0:0:0 |

### Values

| key | Type | Description |
| --- | --- | ---- |
| seconds | number | seconds value |
| minutes | number | minutes value |
| hours | number | hours value |
| days | number | days value |
| isRunning | boolean | flag to indicate if stopwatch is running or not |
| start | function | function to be called to start/resume stopwatch |
| pause | function | function to be called to pause stopwatch |
| reset | function | function to be called to reset stopwatch to 0:0:0:0, you can also pass offset parameter to this function to reset stopwatch with offset, similar to how `offsetTimestamp` will offset the initial stopwatch time, this function will accept also a second argument which will decide if stopwatch should automatically start after reset or not default is `true` |


---


## `useTime` - [Demo](https://amrlabib.github.io/vue-timer-hook/)

### Example

```html
<template>
    <div>
        <h1>vue-timer-hook </h1>
        <p>Current Time Demo</p>
        <div>
            <span>{{hours}}</span>:<span>{{minutes}}</span>:<span>{{seconds}}</span><span>{{ampm}}</span>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { useTime } from 'vue-timer-hook';

export default defineComponent({
  name: "Home",
  setup() {
    const {
        seconds,
        minutes,
        hours,
        ampm,
    } = useTime({ format: '12-hour'});
    return { 
        seconds,
        minutes,
        hours,
        ampm,
     };
  },
});
```
### Settings

| key | Type | Required | Description |
| --- | --- | --- | ---- |
| format | string | No | if set to `12-hour` time will be formatted with am/pm |

### Values

| key | Type | Description |
| --- | --- | ---- |
| seconds | number | seconds value |
| minutes | number | minutes value |
| hours | number | hours value |
| ampm | string | am/pm value if `12-hour` format is used |



### Credit

Inspired by [react-timer-hook](https://github.com/amrlabib/react-timer-hook)
