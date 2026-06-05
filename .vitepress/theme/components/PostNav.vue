<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../../data/posts.data'

const props = defineProps<{ currentUrl: string }>()

// posts are newest-first: the previous (newer) post is at index-1.
const idx = computed(() => posts.findIndex(p => p.url === props.currentUrl))
const newer = computed(() => (idx.value > 0 ? posts[idx.value - 1] : null))
const older = computed(() => (idx.value >= 0 && idx.value < posts.length - 1 ? posts[idx.value + 1] : null))
</script>

<template>
  <nav v-if="newer || older" class="post-nav" aria-label="More posts">
    <a v-if="newer" class="post-nav-item post-nav-newer" :href="newer.url">
      <span class="post-nav-dir">← Newer</span>
      <span class="post-nav-title">{{ newer.title }}</span>
    </a>
    <span v-else />
    <a v-if="older" class="post-nav-item post-nav-older" :href="older.url">
      <span class="post-nav-dir">Older →</span>
      <span class="post-nav-title">{{ older.title }}</span>
    </a>
  </nav>
</template>
