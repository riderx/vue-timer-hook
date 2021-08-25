<template>
    <div>
      <h2>UseStopwatch Demo</h2>
      <Timer :seconds="stopwatch.seconds" :minutes="stopwatch.minutes" :hours="stopwatch.hours" />
      <Button @click="stopwatch.start()">Start</Button>
      <Button @click="stopwatch.pause()">Pause</Button>
      <Button @click="stopwatch.reset()">Reset</Button>
    </div>
</template>

<script setup>
import Button from "./button.vue"
import Timer from "./timer.vue"
import { useStopwatch } from '../../src/index';

const stopwatch = useStopwatch();
</script>