<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, ref } from 'vue'

declare const __COPYRIGHT_YEAR__: number

const { site, isDark, page } = useData()

const copyrightYear = __COPYRIGHT_YEAR__
const rel = computed(() => page.value.relativePath)
const isHome = computed(() => rel.value === 'index.md' || /^page\d+\.md$/.test(rel.value))
const isAbout = computed(() => rel.value === 'about.md')
const isArchive = computed(() => rel.value === 'archive.md')

// Collapsed nav on mobile (no effect on desktop, where the sidebar is fixed).
const navOpen = ref(false)

function toggleAppearance() {
  isDark.value = !isDark.value
}
</script>

<template>
  <div class="blog-sidebar">
    <div class="blog-sidebar-sticky">
      <div class="blog-sidebar-header">
        <img class="ourlogo" src="/public/rotkehlchen_logo.png" alt="rotki logo">
        <h1 class="blog-sidebar-title">
          <a href="/">{{ site.title }}</a>
        </h1>
        <button
          class="blog-nav-toggle"
          type="button"
          aria-label="Menu"
          aria-controls="blog-sidebar-collapse"
          :aria-expanded="navOpen"
          @click="navOpen = !navOpen"
        >
          <svg v-if="!navOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </button>
      </div>

      <div id="blog-sidebar-collapse" class="blog-sidebar-collapse" :class="{ 'is-open': navOpen }">
        <p class="blog-lead">{{ site.description }}</p>

        <nav class="blog-nav">
          <a class="blog-nav-item" href="https://rotki.com">Rotki Website</a>
          <a class="blog-nav-item" :class="{ active: isHome }" href="/">Blog Home</a>
          <a class="blog-nav-item" :class="{ active: isAbout }" href="/about/">About</a>
          <a class="blog-nav-item" :class="{ active: isArchive }" href="/archive/">Rotki Blogposts Archive</a>
          <a class="blog-nav-item" href="https://github.com/rotki/rotki/releases">Download</a>
          <a class="blog-nav-item" href="https://github.com/rotki/rotki">GitHub</a>
          <a class="blog-nav-item" href="https://x.com/rotkiapp">X / twitter</a>
        </nav>

        <button class="blog-appearance" type="button" @click="toggleAppearance">
          <span class="appearance-light">☾ Switch to dark</span>
          <span class="appearance-dark">☀ Switch to light</span>
        </button>

        <p class="blog-copyright">&copy; 2019-{{ copyrightYear }}. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>
