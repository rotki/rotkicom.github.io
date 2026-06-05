<script setup lang="ts">
import { Content, useData } from 'vitepress'
import { computed } from 'vue'
import { data as posts } from '../data/posts.data'
import Sidebar from './components/Sidebar.vue'
import PostList from './components/PostList.vue'
import PostMeta from './components/PostMeta.vue'
import Toc from './components/Toc.vue'
import Archive from './components/Archive.vue'
import TagList from './components/TagList.vue'
import PostNav from './components/PostNav.vue'
import RelatedPosts from './components/RelatedPosts.vue'

const { frontmatter, page } = useData()

const pageType = computed<string | undefined>(() => frontmatter.value.pageType)

// Match a post page to its entry in the build-time posts data. `relativePath`
// can be the source (`posts/YYYY-MM-DD-slug.md`) or, on a rewritten page, the
// dated output path (`YYYY/MM/DD/slug/index.{md,html}`) — handle both.
function postUrlFromRelPath(rel: string): string | null {
  const src = rel.match(/posts\/(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/)
  if (src) {
    const slug = src[4].replace(/[^A-Za-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    return `/${src[1]}/${src[2]}/${src[3]}/${slug}/`
  }
  const out = rel.match(/(\d{4})\/(\d{2})\/(\d{2})\/([^/]+)\/index\.(?:md|html)$/)
  if (out)
    return `/${out[1]}/${out[2]}/${out[3]}/${out[4]}/`
  return null
}

const currentPost = computed(() => {
  const url = postUrlFromRelPath(page.value.relativePath)
  return url ? posts.find(p => p.url === url) : undefined
})
</script>

<template>
  <div class="blog-root">
    <Sidebar />

    <main class="blog-content">
      <!-- 404 -->
      <div v-if="page.isNotFound || pageType === 'notfound'" class="page">
        <h1 class="page-title">404: Page not found in the Rotki blog</h1>
        <p class="lead">
          Sorry, we've misplaced that URL or it's pointing to something that doesn't exist.
          <a href="/">Head back home</a> to try finding it again.
        </p>
      </div>

      <!-- Home + /pageN/ : full content of three posts each -->
      <PostList v-else-if="pageType === 'posts'" :page="Number(frontmatter.page) || 1" />

      <!-- Single post -->
      <article v-else-if="pageType === 'post'" class="post">
        <h1 class="post-title">{{ frontmatter.title }}</h1>
        <PostMeta :date="currentPost?.date" :minutes="currentPost?.minutes" />
        <TagList v-if="currentPost" :tags="currentPost.tags" />
        <Toc v-if="currentPost" :toc="currentPost.toc" />
        <div class="post-content">
          <Content />
        </div>
        <template v-if="currentPost">
          <PostNav :current-url="currentPost.url" />
          <RelatedPosts :current-url="currentPost.url" :tags="currentPost.tags" />
        </template>
      </article>

      <!-- Archive (posts grouped by year) -->
      <div v-else-if="pageType === 'archive'" class="page">
        <h1 class="page-title">{{ frontmatter.title }}</h1>
        <Archive />
      </div>

      <!-- About / other pages -->
      <div v-else class="page">
        <h1 v-if="frontmatter.title" class="page-title">{{ frontmatter.title }}</h1>
        <Content />
      </div>
    </main>
  </div>
</template>
