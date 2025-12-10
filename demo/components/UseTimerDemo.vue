<script setup>
import { useTimer } from '../../src/index'
import Button from './button.vue'
import CodeBlock from './CodeBlock.vue'
import Timer from './timer.vue'

const props = defineProps({
  expiryTimestamp: {
    type: Number,
    required: true,
  },
})
const timer = useTimer(props.expiryTimestamp)
function reload() {
  // Restarts to 10 minutes timer
  const time = new Date()
  time.setSeconds(time.getSeconds() + 600)
  timer.restart(time)
}

const codeExample = `const time = new Date()
time.setSeconds(time.getSeconds() + 600)
const timer = useTimer(time)

// Or with a ref:
// const expiryTime = ref(Date.now() + 600000)
// const timer = useTimer(expiryTime)`
</script>

<template>
  <div>
    <h2>UseTimer Demo</h2>
    <Timer :seconds="timer.seconds.value" :minutes="timer.minutes.value" :hours="timer.hours.value" :days="timer.days.value" />
    <Button type="button" @click="timer.start()">
      Start
    </Button>
    <Button type="button" @click="timer.pause()">
      Pause
    </Button>
    <Button type="button" @click="timer.resume()">
      Resume
    </Button>
    <Button
      type="button"
      @click="reload()"
    >
      Restart
    </Button>
    <CodeBlock :code="codeExample" />
  </div>
</template>
