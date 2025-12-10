<script setup>
import { useTime } from '../../src/index'
import CodeBlock from './CodeBlock.vue'
import Timer from './timer.vue'

const time = useTime()

const codeExample = `const time = useTime()
// Or with 12-hour format:
// const time = useTime('12-hour')`
</script>

<template>
  <div>
    <h2>UseTime Demo</h2>
    <div>
      <Timer :seconds="time.seconds.value" :minutes="time.minutes.value" :hours="time.hours.value" />
    </div>
    <CodeBlock :code="codeExample" />
  </div>
</template>
