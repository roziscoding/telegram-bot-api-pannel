<script lang="ts">
import Prism from 'prismjs'
import 'prismjs/components/prism-json'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/custom-class/prism-custom-class'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'

import { computed, onMounted, onUpdated, ref } from 'vue'

export default {
  name: 'SyntaxHighlight',
  props: {
    content: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const codeBlock = ref<any>(null)
    const languageClass = computed(() => `language-${props.language}`)

    onMounted(() => {
      Prism.plugins.customClass.prefix('prism-')
      Prism.highlightAll()
    })

    onUpdated(() => {
      Prism.plugins.customClass.prefix('prism-')
      Prism.highlightAll()
    })

    return {
      codeBlock,
      languageClass
    }
  }
}
</script>

<template>
  <div ref="codeBlock">
    <pre><code :class="languageClass" class="line-numbers">{{ content }}</code></pre>
  </div>
</template>
