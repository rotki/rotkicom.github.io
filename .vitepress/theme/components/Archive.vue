<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../../data/posts.data'
import { dateToLong } from '../format'

// Group posts by year (newest first), preserving newest-first order within.
const groups = computed(() => {
  const byYear = new Map<string, typeof posts>()
  for (const post of posts) {
    const year = post.date.slice(0, 4)
    if (!byYear.has(year))
      byYear.set(year, [])
    byYear.get(year)!.push(post)
  }
  return [...byYear.entries()]
})
</script>

<template>
  <section class="archive-post-list">
    <template v-for="[year, items] in groups" :key="year">
      <h1>{{ year }}</h1>
      <ul>
        <li v-for="post in items" :key="post.url">
          <a :href="post.url"><span>{{ dateToLong(post.date) }}</span> - {{ post.title }}</a>
        </li>
      </ul>
    </template>
  </section>
</template>
