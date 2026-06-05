import { createContentLoader } from 'vitepress'
import { refFromFilename } from '../posts.shared'

export interface TocEntry {
  id: string
  text: string
}

export interface PostData {
  /** canonical url, e.g. `/2019/08/03/foo/` */
  url: string
  title: string
  /** YYYY-MM-DD */
  date: string
  description: string
  /** fully rendered post body HTML (no title) */
  html: string
  /** h2 headings, for the inline per-post table of contents */
  toc: TocEntry[]
  /** post tags from front matter */
  tags: string[]
  /** estimated reading time in minutes */
  minutes: number
}

declare const data: PostData[]
export { data }

export default createContentLoader('posts/*.md', {
  render: true,
  transform(raw): PostData[] {
    return raw
      .map((page): PostData => {
        // Derive the canonical url/date from the source filename so the data
        // loader and the rewrites map always agree. createContentLoader yields
        // the source-based url (`/posts/<file>.html`) here, not the rewrite.
        const ref = refFromFilename(filenameFromPage(page))
        const html = page.html ?? ''
        return {
          url: ref.url,
          date: ref.date,
          title: String(page.frontmatter.title ?? ref.slug),
          description: String(page.frontmatter.description ?? ''),
          html,
          toc: extractToc(html),
          tags: Array.isArray(page.frontmatter.tags) ? page.frontmatter.tags.map(String) : [],
          minutes: readingMinutes(html),
        }
      })
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  },
})

// Recover the source `YYYY-MM-DD-slug.md` basename for a loaded page, whether
// it arrives as a source url (`/posts/<file>.html`) or a dated rewrite url.
function filenameFromPage(page: { url: string, src?: string }): string {
  if (page.src) {
    const b = page.src.split('/').pop()
    if (b)
      return b
  }
  const last = (page.url.split('/').filter(Boolean).pop() || '').replace(/\.html$/, '')
  if (/^\d{4}-\d{2}-\d{2}-/.test(last))
    return `${last}.md`
  const m = page.url.match(/\/(\d{4})\/(\d{2})\/(\d{2})\/([^/]+)\/?$/)
  if (m)
    return `${m[1]}-${m[2]}-${m[3]}-${m[4]}.md`
  throw new Error(`Cannot derive post filename from url: ${page.url}`)
}

function readingMinutes(html: string): number {
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

function extractToc(html: string): TocEntry[] {
  const out: TocEntry[] = []
  const re = /<h2[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g
  let m: RegExpExecArray | null
  // eslint-disable-next-line no-cond-assign
  while ((m = re.exec(html))) {
    const id = m[1]
    const text = m[2]
      .replace(/<a\b[^>]*>[\s\S]*?<\/a>/g, '') // drop the header-anchor link
      .replace(/<[^>]+>/g, '') // drop any remaining tags
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim()
    out.push({ id, text })
  }
  return out
}
