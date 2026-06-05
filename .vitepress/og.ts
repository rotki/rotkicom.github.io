import type { SiteConfig } from 'vitepress'
import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { dateToString } from './theme/format'
import { listPosts, POSTS_DIR } from './posts.shared'

const DIRNAME = path.dirname(fileURLToPath(import.meta.url))
const FONT_DIR = path.resolve(DIRNAME, '../node_modules/@fontsource/inter/files')
const LOGO = path.resolve(DIRNAME, '../public/public/rotkehlchen_logo.png')

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

/** Public path of a post's generated OG image. Keyed by date+slug because slugs
 *  are not unique on their own (e.g. two `year-in-review` posts). */
export function ogImagePath(ref: { date: string, slug: string }): string {
  return `/public/og/${ref.date}-${ref.slug}.png`
}

function font(weight: 400 | 600 | 700 | 800 | 900) {
  return {
    name: 'Inter',
    data: fs.readFileSync(path.join(FONT_DIR, `inter-latin-${weight}-normal.woff`)),
    weight,
    style: 'normal' as const,
  }
}

/**
 * Render a branded 1200×630 social card for every post into
 * `<outDir>/public/og/<slug>.png`. Called from buildEnd.
 */
export async function generateOgImages(siteConfig: SiteConfig, brand: { title: string, site: string }): Promise<void> {
  const outDir = path.join(siteConfig.outDir, 'public', 'og')
  fs.mkdirSync(outDir, { recursive: true })

  const logoDataUri = `data:image/png;base64,${fs.readFileSync(LOGO).toString('base64')}`
  const fonts = [font(400), font(700), font(800), font(900)]

  for (const post of listPosts()) {
    const title = readTitle(path.join(POSTS_DIR, path.basename(post.file))) ?? post.slug
    const svg = await satori(card({ blogTitle: brand.title, title, date: dateToString(post.date), site: brand.site, logoDataUri }), {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts,
    })
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng()
    fs.writeFileSync(path.join(outDir, `${post.date}-${post.slug}.png`), png)
  }
  siteConfig.logger.info(`  ✓ generated ${listPosts().length} OG images`)
}

/** Read the (optionally quoted) `title:` from a post's front matter. */
function readTitle(file: string): string | undefined {
  const raw = fs.readFileSync(file, 'utf8')
  const m = raw.match(/^title\s*:\s*(.+)$/m)
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : undefined
}

/** Build the satori VDOM for one card. */
function card(o: { blogTitle: string, title: string, date: string, site: string, logoDataUri: string }) {
  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px',
        backgroundColor: '#4f5ba5',
        backgroundImage: 'linear-gradient(135deg, #4f5ba5 0%, #353e73 100%)',
        color: '#ffffff',
        fontFamily: 'Inter',
      },
      children: [
        // header: logo + blog title
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', gap: '28px' },
            children: [
              { type: 'img', props: { src: o.logoDataUri, width: 96, height: 96 } },
              { type: 'div', props: { style: { fontSize: 40, fontWeight: 800 }, children: o.blogTitle } },
            ],
          },
        },
        // post title
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontSize: o.title.length > 70 ? 58 : 72,
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            },
            children: o.title,
          },
        },
        // footer: date + tagline
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 30,
              color: 'rgba(255,255,255,0.85)',
            },
            children: [
              { type: 'div', props: { style: { display: 'flex' }, children: o.date } },
              { type: 'div', props: { style: { display: 'flex' }, children: o.site } },
            ],
          },
        },
      ],
    },
  }
}
