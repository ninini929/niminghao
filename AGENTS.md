# AGENTS.md

## Repo type
- Static site: pure HTML/CSS/JS, no build tools/package.json
- Entry: `index.html` (catalog of exercises)
- Chinese course archive by 倪铭浩

## Structure (key)
- `index.html` - main catalog linking exercises
- `html_basic001.html`, `html_self.html` - HTML basics/profile
- `stack004.*`, `picture_above004.*`, `layout004.*`, `grid.html` - CSS layout
- `css3.*` - CSS3 selectors/animations
- `svg004.*` - SVG icons/nav
- `starter-level1-0611nmh.html`, `starter-level2-0611nmh.html` - practice files
- `data.js`, `js_obj_fun.html` - JS snippets
- `cdn/`, `font/`, `img/`, `iconfont-*` - assets

## Development
- No install/build/lint/test commands (no package.json)
- Edit files directly in repo root; open `index.html` in browser to preview
- Keep local assets (no CDN). See `.gitignore` notes re Gitee token

## Conventions
- Keep Chinese content consistent with existing pages
- When adding exercise, update `index.html` catalog (increment count) matching style
- Preserve asset paths (`css/`, `img/`, `font/`, `cdn/`)

## Gotchas
- `.trae/skills/git-push-gitee/` and `.gitee-token.local` are gitignored (contains tokens)
- Follow existing naming (`*-004.*` etc) when adding related files
