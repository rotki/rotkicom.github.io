// Scaffold a new blog post:  pnpm new "My post title"
// Creates posts/YYYY-MM-DD-slug.md with the standard front matter and adds any
// pagination page (page2.md, page3.md, …) that the new post count requires.
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const POSTS = path.join(ROOT, 'posts')
const PAGE_SIZE = 3

const title = process.argv.slice(2).join(' ').trim()
if (!title) {
  console.error('Usage: pnpm new "Post title"')
  process.exit(1)
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const now = new Date()
const date = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, '0'),
  String(now.getDate()).padStart(2, '0'),
].join('-')

const file = path.join(POSTS, `${date}-${slug}.md`)
if (fs.existsSync(file)) {
  console.error(`Post already exists: ${path.relative(ROOT, file)}`)
  process.exit(1)
}

const body = `---
date: ${date}
pageType: post
title: "${title.replace(/"/g, '\\"')}"
description: One-line summary used for meta tags, social cards and the feed.
# author: Lefteris Karapetsas   # optional; defaults to "The rotki team"
# updated: ${date}              # set when you materially edit an existing post
tags:
- rotki
keywords:
- rotki
---

Write your post here.
`

fs.writeFileSync(file, body)
console.log(`✓ created ${path.relative(ROOT, file)}`)

// Ensure home + page2..pageN exist for the new post count (3 posts per page).
const count = fs.readdirSync(POSTS).filter(f => f.endsWith('.md')).length
const pages = Math.max(1, Math.ceil(count / PAGE_SIZE))
const indexFm = fs.readFileSync(path.join(ROOT, 'index.md'), 'utf8')
for (let n = 2; n <= pages; n++) {
  const p = path.join(ROOT, `page${n}.md`)
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, indexFm.replace(/^page:\s*\d+$/m, `page: ${n}`))
    console.log(`✓ added pagination page page${n}.md`)
  }
}
