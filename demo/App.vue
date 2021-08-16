<template>
  <div>
    <div class="header-bg">
      <div class="container">
        <div class="header">
          <h1 class="h1">vue-timer-hook</h1>
          <div>
            <iframe src="https://ghbtns.com/github-btn.html?user=riderx&repo=vue-timer-hook&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160" height="30" title="GitHub" />
            <iframe src="https://ghbtns.com/github-btn.html?user=riderx&repo=vue-timer-hook&type=fork&count=true&size=large" frameborder="0" scrolling="0" width="126" height="30" title="GitHub" />
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <p>
        Vue timer hook is a custom  <a href="https://v3.vuejs.org/guide/composition-api-introduction.html" target="_blank">composition api</a> module built to handle timer, stopwatch, and time logic/state in your vue component.
      </p>
      <UseTimerDemo :expiryTimestamp="time" />
      <div class="separator" />
      <UseStopwatchDemo />
      <div class="separator" />
      <UseTimeDemo />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import UseTimeDemo from './components/UseTimeDemo.vue'
import UseTimerDemo from './components/UseTimerDemo.vue'
import UseStopwatchDemo from './components/UseStopwatchDemo.vue'

export default defineComponent({
  name: 'App',
  components: { UseTimerDemo, UseStopwatchDemo, UseTimeDemo },
  data() {
    return {
      time: new Date().setSeconds(new Date().getSeconds() + 600)
    }
  },
})
</script>
<style >
  html, body {
    margin: 0;
    font-family: Arial;
    text-align: left;
    color: #404549;
  }
  h2 {
    margin-top: 20px;
  }
</style>
<style scoped>

  .container{
    width: 1170px;
    margin-left: auto;
    margin-right: auto;
  }

  .header-bg {
    background-color: #404549;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header h1 {
    margin: 20px 0;
  }

  .h1 {
    color: white;
  }

  .separator {
    height: 0px;
    margin-top: 30px;
    border: dashed 2px #404549;
  }

</style>