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

const timer = useTimer(props.expiryTimestamp, false)
function reload() {
  timer.restart(Date.now() + 10 * 60 * 1000)
}

const codeExample = `const expiryTimestamp = Date.now() + 10 * 60 * 1000
const timer = useTimer(expiryTimestamp, false)

// Or with refs:
// const expiryTime = ref(Date.now() + 600_000)
// const autoStart = ref(false)
// const timer = useTimer(expiryTime, autoStart)`
</script>

<template>
  <div>
    <h2>UseTimer Demo ( autostart=false )</h2>
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
