<template>
    <div>
      <h2>UseTime Demo</h2>
      <div>
        <Timer :seconds="time.seconds" :minutes="time.minutes" :hours="time.hours" />
      </div>
    </div>
</template>

<script setup>
import { useTime } from '../../src/index';
import Timer from "./timer.vue"

const time = useTime()

</script>