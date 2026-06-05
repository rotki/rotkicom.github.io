# Robin the Accounting Bird

Source of the rotki blog ("Robin's Blog"), served at **blog.rotki.com**.

Built with [VitePress 2](https://vitepress.dev) + a small custom theme on
[Tailwind CSS v4](https://tailwindcss.com). It replaces the previous Jekyll
(Hyde/Poole) site while preserving every URL, the `/atom.xml` feed and the
overall layout.

## Requirements

- Node `>=24 <25` (see `.nvmrc`)
- pnpm `>=11 <12` (pinned via `packageManager`)

Dependencies are installed under hardened pnpm settings (`pnpm-workspace.yaml`):
a 7-day release cooldown (`minimumReleaseAge`), exact pins (`saveExact`),
strict dependency build allow-listing, `no-downgrade` trust policy and exotic
sub-dependency blocking — matching the rotki ui-library conventions.

## Develop

```bash
pnpm install
pnpm dev           # local preview at http://localhost:5173
```

## Build

```bash
pnpm build       # output in .vitepress/dist
pnpm preview   # serve the production build locally
```

## Writing a post

Quickest way — scaffold one (creates the file with front matter and adds a
pagination page if needed):

```bash
pnpm new "My post title"
```

Or add a Markdown file to `posts/` named `YYYY-MM-DD-slug.md` with front matter:

```yaml
---
date: 2026-01-31
pageType: post
title: My post title
description: One-line summary used for meta/OG/feed.
tags: [rotki]
keywords: [rotki, ...]
---
```

The URL is derived from the filename as `/YYYY/MM/DD/slug/` (matching the old
Jekyll permalinks). The home page shows the three newest posts in full and
paginates at `/page2/`, `/page3/`, … — add an empty `pageN.md`
(`pageType: posts`, `page: N`) when a new page is needed (every 3 posts).

## Deploy

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site
and publishes `.vitepress/dist` to GitHub Pages. The repo's
**Settings → Pages → Source** must be set to **GitHub Actions**.
