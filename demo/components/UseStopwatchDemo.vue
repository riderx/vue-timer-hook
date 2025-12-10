<script setup>
import { useStopwatch } from '../../src/index'
import Button from './button.vue'
import CodeBlock from './CodeBlock.vue'
import Timer from './timer.vue'

const stopwatch = useStopwatch()

const codeExample = `const stopwatch = useStopwatch()
// With offset:
// const stopwatch = useStopwatch(300) // Start at 300 seconds
// With autoStart:
// const stopwatch = useStopwatch(0, false) // Don't auto-start`
</script>

<template>
  <div>
    <h2>UseStopwatch Demo</h2>
    <Timer :seconds="stopwatch.seconds.value" :minutes="stopwatch.minutes.value" :hours="stopwatch.hours.value" />
    <Button @click="stopwatch.start()">
      Start
    </Button>
    <Button @click="stopwatch.pause()">
      Pause
    </Button>
    <Button @click="stopwatch.reset()">
      Reset
    </Button>
    <CodeBlock :code="codeExample" />
  </div>
</template>
