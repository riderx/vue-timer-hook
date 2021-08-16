<template>
  <div class="timer-container">
    <Digit v-if="days" :digit="days" title="DAYS" />
    <span class="separator-container" v-if="days"><span class="separator" /><span /></span>
    <Digit :digit="hours" title="HOURS" />
    <span class="separator-container"><span class="separator" /><span /></span>
    <Digit :digit="minutes" title="MINUTES" />
    <span class="separator-container"><span class="separator" /><span /></span>
    <Digit :digit="seconds" title="SECONDS" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Digit from './digit.vue'

export default defineComponent({
  name: 'Timer',
  components: { Digit },
  props: {
    days: {
      type: Object,
      required: false
    },
    hours: {
      type: Object,
      required: true
    },
    minutes: {
      type: Object,
      required: true
    },
    seconds: {
      type: Object,
      required: true
    },
  },
})
</script>
<style scoped>
  .timer-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
  }
  .separator-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: flex-end;
    margin: 0 0 10px 0px;
  }
  .separator {
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: #404549;
    border-radius: 6px;
    margin: 5px 0px;
  }

</style>