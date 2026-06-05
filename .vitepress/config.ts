import type { HeadConfig, SiteConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
// @ts-expect-error no bundled types; only used inside markdown.config
import footnote from 'markdown-it-footnote'
import { defineConfig } from 'vitepress'
import { buildRewrites, listPosts, listPostsFull, urlForSource } from './posts.shared'
import { generateFeed } from './feed'
import { generateOgImages, OG_HEIGHT, OG_WIDTH, ogImagePath } from './og'

const HOSTNAME = 'https://blog.rotki.com'
const TITLE = 'Robin\'s Blog'
const TAGLINE = 'the accounting bird'
const DESCRIPTION
  = 'This is the Rotki blog at which Robin, the accounting bird, is writing about finance, accounting, analytics, DeFi, cryptoeconomics and more!'
// Posts are written by various people and reviewed by the team; default to the
// team and let a post override with an `author:` front-matter field.
const DEFAULT_AUTHOR = 'The rotki team'
const KNOWN_AUTHOR_URLS: Record<string, string> = {
  'Lefteris Karapetsas': 'https://twitter.com/lefterisjp',
}
const LOGO_URL = `${HOSTNAME}/public/rotkehlchen_logo.png`

// Self-hosted Umami analytics (replaces the retired Universal Analytics, which
// Google stopped processing in 2023). Fill both in from the Umami dashboard for
// blog.rotki.com; until then no analytics script is emitted.
const UMAMI_SRC = 'https://sigil.rotki.com/s.js'
const UMAMI_WEBSITE_ID = '35300a6c-5b46-4073-9c64-b8e27058507f'
const PUBLISHER = {
  '@type': 'Organization',
  'name': 'rotki',
  'url': 'https://rotki.com',
  'logo': { '@type': 'ImageObject', 'url': LOGO_URL },
}

const posts = listPosts()
const postUrls = new Set(posts.map(p => p.url))

export default defineConfig({
  lang: 'en-us',
  title: TITLE,
  description: DESCRIPTION,
  cleanUrls: false,
  metaChunk: true,
  ignoreDeadLinks: true,
  srcExclude: ['README.md'],

  // Preserve every Jekyll URL: posts/<file>.md -> /YYYY/MM/DD/slug/
  rewrites: buildRewrites(),

  sitemap: {
    hostname: HOSTNAME,
    transformItems(items) {
      // Drop the 404 page, and add <lastmod> for posts (their last-modified date,
      // i.e. the `updated:` date if set, else the publication date).
      const byUrl = new Map(listPostsFull().map(p => [p.url, p.modified]))
      return items
        .filter(item => !/(^|\/)404(\.html)?$/.test(item.url))
        .map((item) => {
          const date = byUrl.get(`/${item.url.replace(/^\//, '')}`)
          return date ? { ...item, lastmod: new Date(`${date}T00:00:00Z`) } : item
        })
    },
  },

  markdown: {
    // Jekyll had `syntax_highlighter_opts.block.line_numbers: true` globally.
    lineNumbers: true,
    // Shiki is VitePress's default highlighter. GitHub's high-contrast variants
    // are AA-compliant for every token (incl. comments) in both modes.
    theme: {
      light: 'github-light-high-contrast',
      dark: 'github-dark-high-contrast',
    },
    // kramdown supported footnotes ([^1]); enable them in markdown-it too.
    config(md) {
      md.use(footnote)
    },
  },

  vite: {
    plugins: [tailwindcss()],
    // Build-time constant so the footer year is identical on SSR and client
    // (avoids a hydration mismatch from calling new Date() in the component).
    define: { __COPYRIGHT_YEAR__: new Date().getFullYear() },
  },

  head: [
    // Self-hosted, cookieless Umami analytics (replaces the retired UA snippet).
    ...(UMAMI_SRC && UMAMI_WEBSITE_ID
      ? [['script', { 'defer': '', 'src': UMAMI_SRC, 'data-website-id': UMAMI_WEBSITE_ID, 'data-domains': 'blog.rotki.com' }]] as HeadConfig[]
      : []),
    ['link', { href: 'http://gmpg.org/xfn/11', rel: 'profile' }],
    ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }],
    ['link', { rel: 'shortcut icon', href: '/public/favicon.ico' }],
    // Feed autodiscovery: the original Atom feed (correctly typed) + an RSS 2.0 feed.
    ['link', { rel: 'alternate', type: 'application/atom+xml', title: 'Robin\'s Blog (Atom)', href: '/atom.xml' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'Robin\'s Blog (RSS)', href: '/rss.xml' }],
    // Open Graph / Twitter card defaults
    ['meta', { property: 'og:site_name', content: TITLE }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@rotkiapp' }],
  ],

  transformPageData(pageData) {
    const fm = pageData.frontmatter
    // index.md and /pageN/ are the paginated "home" — same <title> as Jekyll.
    const isHomeLike = fm.pageType === 'posts'
    const path = urlForSource(pageData.relativePath)
    const url = `${HOSTNAME}${path}`
    const isPost = postUrls.has(path)

    // Page <title>: Home keeps "Robin's Blog · the accounting bird",
    // everything else becomes "<title> · Robin's Blog".
    if (isHomeLike) {
      // Exact old home <title>: "Robin's Blog · the accounting bird" (no template).
      pageData.title = `${TITLE} · ${TAGLINE}`
      pageData.titleTemplate = false
    }
    else {
      pageData.titleTemplate = `:title · ${TITLE}`
    }

    const ref = posts.find(p => p.url === path)
    const title: string = isHomeLike ? `${TITLE} · ${TAGLINE}` : (fm.title || TITLE)
    const description: string = fm.description || DESCRIPTION
    const head: HeadConfig[] = (pageData.frontmatter.head ??= [])

    head.push(['meta', { name: 'description', content: description }])
    if (Array.isArray(fm.keywords))
      head.push(['meta', { name: 'keywords', content: fm.keywords.join(',') }])
    head.push(['link', { rel: 'canonical', href: url }])

    // Open Graph + Twitter. Posts get a unique satori-rendered share card;
    // other pages fall back to the logo.
    const ogImage = ref ? `${HOSTNAME}${ogImagePath(ref)}` : LOGO_URL
    head.push(
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:type', content: isPost ? 'article' : 'website' }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { property: 'og:image:alt', content: title }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: ogImage }],
    )

    if (ref) {
      const modified = modifiedDate(fm, ref.date)
      head.push(
        ['meta', { property: 'og:image:width', content: String(OG_WIDTH) }],
        ['meta', { property: 'og:image:height', content: String(OG_HEIGHT) }],
        ['meta', { property: 'og:image:type', content: 'image/png' }],
        ['meta', { property: 'article:published_time', content: `${ref.date}T00:00:00Z` }],
        ['meta', { property: 'article:modified_time', content: `${modified}T00:00:00Z` }],
        ['meta', { property: 'article:author', content: authorName(fm) }],
      )
      if (Array.isArray(fm.tags)) {
        for (const tag of fm.tags)
          head.push(['meta', { property: 'article:tag', content: String(tag) }])
      }

      head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': fm.title,
        'description': description,
        'image': { '@type': 'ImageObject', 'url': ogImage, 'width': OG_WIDTH, 'height': OG_HEIGHT },
        'datePublished': ref.date,
        'dateModified': modified,
        'inLanguage': 'en-us',
        'keywords': Array.isArray(fm.keywords) ? fm.keywords.join(', ') : undefined,
        'author': authorLd(authorName(fm)),
        'publisher': PUBLISHER,
        'mainEntityOfPage': { '@type': 'WebPage', '@id': url },
      })])

      // Breadcrumb: Home › Article
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': TITLE, 'item': `${HOSTNAME}/` },
          { '@type': 'ListItem', 'position': 2, 'name': fm.title, 'item': url },
        ],
      })])
    }

    // Home: WebSite + Blog structured data.
    if (path === '/') {
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': TITLE,
        'alternateName': `${TITLE} · ${TAGLINE}`,
        'url': `${HOSTNAME}/`,
        'description': DESCRIPTION,
        'inLanguage': 'en-us',
        'publisher': PUBLISHER,
      })])

      head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        'name': TITLE,
        'url': `${HOSTNAME}/`,
        'description': DESCRIPTION,
        'inLanguage': 'en-us',
        'publisher': PUBLISHER,
        'blogPost': listPostsFull().map(p => ({
          '@type': 'BlogPosting',
          'headline': p.title,
          'description': p.description || undefined,
          'url': `${HOSTNAME}${p.url}`,
          'datePublished': p.date,
          'image': `${HOSTNAME}${ogImagePath(p)}`,
        })),
      })])
    }
  },

  async buildEnd(siteConfig: SiteConfig) {
    await generateFeed(siteConfig, { hostname: HOSTNAME, title: TITLE, description: DESCRIPTION, author: DEFAULT_AUTHOR })
    await generateOgImages(siteConfig, { title: TITLE, site: HOSTNAME.replace(/^https?:\/\//, '') })
  },
})

/** Author display name for a page: front-matter `author`, else the team. */
function authorName(fm: Record<string, any>): string {
  return typeof fm.author === 'string' && fm.author.trim() ? fm.author.trim() : DEFAULT_AUTHOR
}

/** Last-modified date: front-matter `updated:` (YYYY-MM-DD) if set, else the
 *  publication date (an unmodified post's modified date equals its published one).
 *  YAML parses an unquoted date into a Date object, so handle both shapes. */
function modifiedDate(fm: Record<string, any>, published: string): string {
  const u = fm.updated
  let s = ''
  if (typeof u === 'string')
    s = u.trim()
  else if (u instanceof Date && !Number.isNaN(u.getTime()))
    s = u.toISOString().slice(0, 10)
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : published
}

/** schema.org author node — Organization for the team, Person otherwise. */
function authorLd(name: string): Record<string, any> {
  if (name === DEFAULT_AUTHOR)
    return { '@type': 'Organization', 'name': name, 'url': 'https://rotki.com' }
  const url = KNOWN_AUTHOR_URLS[name]
  return { '@type': 'Person', 'name': name, ...(url ? { url } : {}) }
}
