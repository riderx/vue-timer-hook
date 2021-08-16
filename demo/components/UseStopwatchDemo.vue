<template>
    <div>
      <h2>UseStopwatch Demo</h2>
      <Timer :seconds="stopwatch.seconds" :minutes="stopwatch.minutes" :hours="stopwatch.hours" />
      <Button @click="stopwatch.start()">Start</Button>
      <Button @click="stopwatch.pause()">Pause</Button>
      <Button @click="stopwatch.reset()">Reset</Button>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import Button from "./button.vue"
import Timer from "./timer.vue"
import { useStopwatch } from '../../src/index';

export default defineComponent({
  name: 'UseStopwatchDemo',
  components: { Button, Timer },
  setup() {
    const stopwatch = useStopwatch();
    return {
      stopwatch
    }
  },
})
</script>