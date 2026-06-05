<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../../data/posts.data'
import PostMeta from './PostMeta.vue'
import Pagination from './Pagination.vue'
import Toc from './Toc.vue'
import TagList from './TagList.vue'

// Jekyll `paginate: 3` — keep in sync with posts.shared#PAGE_SIZE.
const PAGE_SIZE = 3

const props = defineProps<{ page: number }>()

const total = computed(() => Math.max(1, Math.ceil(posts.length / PAGE_SIZE)))
const slice = computed(() => {
  const start = (props.page - 1) * PAGE_SIZE
  return posts.slice(start, start + PAGE_SIZE)
})
</script>

<template>
  <div class="posts">
    <article v-for="post in slice" :key="post.url" class="post">
      <h1 class="post-title">
        <a :href="post.url">{{ post.title }}</a>
      </h1>
      <PostMeta :date="post.date" :minutes="post.minutes" />
      <TagList :tags="post.tags" />
      <Toc :toc="post.toc" />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="post-content" v-html="post.html" />
    </article>
  </div>

  <Pagination :page="page" :total="total" />
</template>
