<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ page: number, total: number }>()

// Mirrors the Jekyll index.html pagination: "Older" → higher page number,
// "Newer" → lower page number (page 2's "Newer" links back to home `/`).
const olderHref = computed(() => (props.page < props.total ? `/page${props.page + 1}/` : null))
const newerHref = computed(() => {
  if (props.page <= 1)
    return null
  return props.page === 2 ? '/' : `/page${props.page - 1}/`
})
</script>

<template>
  <div class="pagination">
    <a v-if="olderHref" class="pagination-item older" :href="olderHref">Older</a>
    <span v-else class="pagination-item older">Older</span>

    <a v-if="newerHref" class="pagination-item newer" :href="newerHref">Newer</a>
    <span v-else class="pagination-item newer">Newer</span>
  </div>
</template>
