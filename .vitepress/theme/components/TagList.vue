<script setup lang="ts">
defineProps<{ tags: string[] }>()
</script>

<template>
  <ul v-if="tags.length" class="post-tags" aria-label="Tags">
    <li v-for="tag in tags" :key="tag" class="post-tag">{{ tag }}</li>
  </ul>
</template>
