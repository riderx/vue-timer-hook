<template>
    <div>
      <h2>UseTime Demo</h2>
      <div>
        <Timer :seconds="time.seconds" :minutes="time.minutes" :hours="time.hours" />
      </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useTime } from '../../src/index';
import Timer from "./timer.vue"

export default defineComponent({
  name: 'UseTimeDemo',
  components: { Timer },
  setup() {
    const time = useTime()
    return {
      time
    }
  },
})
</script>