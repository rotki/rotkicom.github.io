<script setup lang="ts">
import type { TocEntry } from '../../data/posts.data'

defineProps<{ toc: TocEntry[] }>()
</script>

<template>
  <nav v-if="toc.length" class="post-toc" aria-label="Table of contents">
    <ul>
      <li v-for="item in toc" :key="item.id">
        <a :href="`#${item.id}`">{{ item.text }}</a>
      </li>
    </ul>
  </nav>
</template>
