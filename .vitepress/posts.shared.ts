import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Single source of truth for post URLs. Jekyll (permalink: pretty) turned a
// `_posts/YYYY-MM-DD-slug.md` filename into the URL `/YYYY/MM/DD/slug/`,
// sanitizing any non `[A-Za-z0-9-]` character in the slug to `-` (case kept).
// We reproduce that byte-for-byte so every existing URL keeps working.

export interface PostRef {
  /** source file relative to repo root, e.g. `posts/2019-08-03-foo.md` */
  file: string
  /** YYYY-MM-DD */
  date: string
  /** url slug (last path segment) */
  slug: string
  /** canonical url with leading + trailing slash, e.g. `/2019/08/03/foo/` */
  url: string
  /** vitepress rewrite target, e.g. `2019/08/03/foo/index.md` */
  rewrite: string
}

/** Posts shown per pagination page (Jekyll `paginate: 3`). */
export const PAGE_SIZE = 3

const DIRNAME = path.dirname(fileURLToPath(import.meta.url))
export const POSTS_DIR = path.resolve(DIRNAME, '../posts')

/** Jekyll-compatible slug sanitisation (keeps case, like `permalink: pretty`). */
export function slugify(raw: string): string {
  return raw
    .replace(/[^A-Za-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Parse a `YYYY-MM-DD-slug.md` filename into a PostRef. */
export function refFromFilename(filename: string): PostRef {
  const m = filename.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/)
  if (!m)
    throw new Error(`Unexpected post filename: ${filename}`)
  const [, y, mo, d, rawSlug] = m
  const slug = slugify(rawSlug)
  const date = `${y}-${mo}-${d}`
  const url = `/${y}/${mo}/${d}/${slug}/`
  return {
    file: `posts/${filename}`,
    date,
    slug,
    url,
    rewrite: `${y}/${mo}/${d}/${slug}/index.md`,
  }
}

/** All posts, newest first (matches Jekyll `site.posts` ordering). */
export function listPosts(): PostRef[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(refFromFilename)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

/** Number of pagination pages: home + page2..pageN (ceil(posts / size)). */
export function pageCount(): number {
  return Math.max(1, Math.ceil(listPosts().length / PAGE_SIZE))
}

/** Posts with `title`/`description`/`modified` read from front matter.
 *  `modified` is the `updated:` date if valid, else the publication date. */
export function listPostsFull(): Array<PostRef & { title: string, description: string, modified: string }> {
  const strip = (s: string): string => s.trim().replace(/^["']|["']$/g, '')
  return listPosts().map((p) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, path.basename(p.file)), 'utf8')
    const t = raw.match(/^title\s*:\s*(.+)$/m)
    const d = raw.match(/^description\s*:\s*(.+)$/m)
    const u = raw.match(/^updated\s*:\s*(.+)$/m)
    const updated = u ? strip(u[1]) : ''
    return {
      ...p,
      title: t ? strip(t[1]) : p.slug,
      description: d ? strip(d[1]) : '',
      modified: /^\d{4}-\d{2}-\d{2}$/.test(updated) ? updated : p.date,
    }
  })
}

/**
 * Build the VitePress `rewrites` map. Maps every source file to the dated /
 * trailing-slash directory index that reproduces the Jekyll URL exactly:
 *  - posts      -> /YYYY/MM/DD/slug/
 *  - about      -> /about/
 *  - archive    -> /archive/
 *  - page2..N   -> /pageN/
 */
export function buildRewrites(): Record<string, string> {
  const out: Record<string, string> = {}
  for (const p of listPosts())
    out[p.file] = p.rewrite
  out['about.md'] = 'about/index.md'
  out['archive.md'] = 'archive/index.md'
  for (let n = 2; n <= pageCount(); n++)
    out[`page${n}.md`] = `page${n}/index.md`
  return out
}

/**
 * Canonical public URL (leading + trailing slash) for a source `relativePath`,
 * taking the rewrites above into account. Returns `/` for the home page.
 */
export function urlForSource(relativePath: string): string {
  const rewrites = buildRewrites()
  const target = rewrites[relativePath] ?? relativePath
  let p = target.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
  if (!p.startsWith('/'))
    p = `/${p}`
  if (p !== '/' && !p.endsWith('/'))
    p = `${p}/`
  return p
}
