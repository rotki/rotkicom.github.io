<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../../data/posts.data'
import { dateToString } from '../format'

const props = defineProps<{ currentUrl: string, tags: string[] }>()

// Rank other posts by number of shared tags, then recency. Keep the top 3.
const related = computed(() => {
  const set = new Set(props.tags)
  return posts
    .filter(p => p.url !== props.currentUrl)
    .map(p => ({ post: p, shared: p.tags.filter(t => set.has(t)).length }))
    .filter(x => x.shared > 0)
    .sort((a, b) => b.shared - a.shared || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, 3)
    .map(x => x.post)
})
</script>

<template>
  <section v-if="related.length" class="related-posts" aria-label="Related posts">
    <h2>Related posts</h2>
    <ul>
      <li v-for="post in related" :key="post.url">
        <a :href="post.url">{{ post.title }}</a>
        <span class="related-date">{{ dateToString(post.date) }}</span>
      </li>
    </ul>
  </section>
</template>
