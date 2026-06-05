import type { SiteConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { Feed } from 'feed'
import { createMarkdownRenderer } from 'vitepress'
import { listPosts, POSTS_DIR } from './posts.shared'

interface FeedMeta {
  hostname: string
  title: string
  description: string
  author: string
}

/**
 * Emit `/atom.xml` reproducing the fields of the original Jekyll feed:
 * feed title/link/updated/id/author and, per post, title/link/updated/id/content.
 * `id` keeps Jekyll's `post.id` shape (no trailing slash, no extension).
 */
export async function generateFeed(siteConfig: SiteConfig, meta: FeedMeta): Promise<void> {
  const { hostname, title, description, author } = meta

  const feed = new Feed({
    id: hostname,
    title,
    description,
    link: `${hostname}/`,
    language: 'en-us',
    updated: new Date(),
    copyright: `© 2019-${new Date().getFullYear()} Rotki Solutions GmbH`,
    image: `${hostname}/public/rotkehlchen_logo.png`,
    favicon: `${hostname}/public/favicon.ico`,
    feedLinks: { atom: `${hostname}/atom.xml`, rss: `${hostname}/rss.xml` },
    author: { name: author },
  })

  const md = await createMarkdownRenderer(siteConfig.srcDir, siteConfig.markdown, siteConfig.site.base, siteConfig.logger)

  for (const post of listPosts()) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, path.basename(post.file)), 'utf8')
    const { frontmatter, body } = splitFrontmatter(raw)
    const html = md.render(body)

    feed.addItem({
      title: String(frontmatter.title ?? post.slug),
      id: `${hostname}${post.url.replace(/\/$/, '')}`,
      link: `${hostname}${post.url}`,
      description: frontmatter.description ? String(frontmatter.description) : undefined,
      content: html,
      author: [{ name: frontmatter.author ? String(frontmatter.author) : author }],
      published: new Date(`${post.date}T00:00:00Z`),
      date: new Date(`${/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.updated || '') ? frontmatter.updated : post.date}T00:00:00Z`),
    })
  }

  fs.writeFileSync(path.join(siteConfig.outDir, 'atom.xml'), feed.atom1())
  fs.writeFileSync(path.join(siteConfig.outDir, 'rss.xml'), feed.rss2())
  siteConfig.logger.info('  ✓ generated /atom.xml + /rss.xml')
}

function splitFrontmatter(raw: string): { frontmatter: Record<string, any>, body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m)
    return { frontmatter: {}, body: raw }
  const frontmatter: Record<string, any> = {}
  // Minimal front-matter read: only scalar `title:` / `description:` / `author:` / `updated:`.
  for (const key of ['title', 'description', 'author', 'updated']) {
    const km = m[1].match(new RegExp(`^${key}\\s*:\\s*(.+)$`, 'm'))
    if (km)
      frontmatter[key] = km[1].trim().replace(/^["']|["']$/g, '')
  }
  return { frontmatter, body: m[2] }
}
