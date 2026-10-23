<script setup lang="ts">
import UseStopwatchDemo from './components/UseStopwatchDemo.vue'
import UseTimeDemo from './components/UseTimeDemo.vue'
import UseTimerDemo from './components/UseTimerDemo.vue'
import UseTimerWaitStartDemo from './components/UseTimerWaitStartDemo.vue'

const expiryTimestamp = Date.now() + 10 * 60 * 1000
</script>

<template>
  <div class="page">
    <header class="hero">
      <div class="wrap hero-inner">
        <div>
          <p class="eyebrow">
            Vue 3 composition API
          </p>
          <h1>vue-timer-hook</h1>
          <p class="lead">
            Countdown timers, stopwatches, and live clocks with reactive refs.
          </p>
        </div>
        <div class="gh-buttons">
          <iframe src="https://ghbtns.com/github-btn.html?user=Cap-go&repo=vue-timer-hook&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160" height="30" title="GitHub stars" />
          <iframe src="https://ghbtns.com/github-btn.html?user=Cap-go&repo=vue-timer-hook&type=fork&count=true&size=large" frameborder="0" scrolling="0" width="126" height="30" title="GitHub forks" />
        </div>
      </div>
    </header>

    <main class="wrap content">
      <section class="card">
        <UseTimerDemo :expiry-timestamp="expiryTimestamp" />
      </section>
      <section class="card">
        <UseTimerWaitStartDemo :expiry-timestamp="expiryTimestamp" />
      </section>
      <section class="card">
        <UseStopwatchDemo />
      </section>
      <section class="card">
        <UseTimeDemo />
      </section>
    </main>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    sans-serif;
  color: #1e293b;
  background: #f1f5f9;
  line-height: 1.5;
}

a {
  color: #0f766e;
}
</style>

<style scoped>
.page {
  min-height: 100vh;
}

.wrap {
  width: min(960px, 100% - 2rem);
  margin-inline: auto;
}

.hero {
  background: linear-gradient(135deg, #0f766e 0%, #134e4a 100%);
  color: #f8fafc;
  padding: 2.5rem 0 2rem;
}

.hero-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-end;
  justify-content: space-between;
}

.eyebrow {
  margin: 0 0 0.25rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.85;
}

h1 {
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
}

.lead {
  margin: 0.75rem 0 0;
  max-width: 36rem;
  opacity: 0.95;
}

.gh-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.content {
  padding: 1.5rem 0 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem 1.5rem 1.5rem;
  box-shadow: 0 1px 3px rgb(15 23 42 / 8%);
}

.card :deep(h2) {
  margin-top: 0;
  font-size: 1.25rem;
}
</style>
