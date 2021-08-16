<template>
    <div>
      <h2>UseTimer Demo</h2>
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

<script>
import { defineComponent, toRefs } from 'vue'
import { useTimer } from '../../src/index';
import Timer from "./timer.vue"
import Button from "./button.vue"

export default defineComponent({
  name: 'UseTimerDemo',
  components: { Timer, Button },
  props: {
    expiryTimestamp: {
      type: Number,
      required: true
    },
  },
  methods: {
    reload() {
      // Restarts to 10 minutes timer
      const time = new Date();
      time.setSeconds(time.getSeconds() + 600);
      this.timer.restart(time);
    }
  },
  setup(props) {
    const { expiryTimestamp } = props
    const timer = useTimer(expiryTimestamp)
    return {
      timer
    }
  },
})
</script>