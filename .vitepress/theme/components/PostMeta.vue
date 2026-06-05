<script setup lang="ts">
import { computed } from 'vue'
import { dateToString } from '../format'

const props = defineProps<{ date?: string, minutes?: number }>()
const label = computed(() => (props.date ? dateToString(props.date) : ''))
</script>

<template>
  <p class="post-date">
    <time v-if="label" :datetime="date">{{ label }}</time>
    <span v-if="minutes">&nbsp;· {{ minutes }} min read</span>
  </p>
</template>
