<template>
    <div>
      <h2>UseTimer Demo ( autostart=false )</h2>
      <Timer :seconds="timer.seconds" :minutes="timer.minutes" :hours="timer.hours" :days="timer.days" />
      <Button type="button" @click="timer.start()">Start</Button>
      <Button type="button" @click="timer.pause()">Pause</Button>
      <Button type="button" @click="timer.resume()">Resume</Button>
      <Button
        type="button"
        @click="reload()"
      >
        Restart
      </Button>
    </div>
</template>

<script setup>
import { useTimer } from '../../src/index';
import Timer from "./timer.vue"
import Button from "./button.vue"

const props = defineProps({
    expiryTimestamp: {
      type: Number,
      required: true
    }
});

const timer = useTimer(props.expiryTimestamp, false)
const reload = () => {
  // Restarts to 10 minutes timer
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  timer.restart(time);
}
</script>