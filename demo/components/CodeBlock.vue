<script setup lang="ts">
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import { computed, onMounted, ref } from 'vue'
import 'highlight.js/styles/github.css'

const props = defineProps<{
  code: string
  language?: string
}>()

hljs.registerLanguage('javascript', javascript)

const codeElement = ref<HTMLElement>()

const highlightedCode = computed(() => {
  return hljs.highlight(props.code, { language: props.language || 'javascript' }).value
})

onMounted(() => {
  if (codeElement.value) {
    hljs.highlightElement(codeElement.value)
  }
})
</script>

<template>
  <pre><code ref="codeElement" :class="`language-${language || 'javascript'}`" v-html="highlightedCode" /></pre>
</template>

<style scoped>
pre {
  background-color: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  margin: 16px 0;
  overflow-x: auto;
}

code {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
}
</style>
