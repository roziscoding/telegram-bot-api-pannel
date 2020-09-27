<script lang="ts">
import { PropType } from 'vue'
export default {
  name: 'BMessage',
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true
    },
    type: {
      type: String as PropType<'success' | 'danger' | 'info'>,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <article v-if="show" class="message" :class="`is-${type}`">
    <div class="message-header" v-if="title">
      <p>{{ title }}</p>
    </div>
    <div class="message-body">
      <slot></slot>
    </div>
  </article>
</template>
