<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project instructions for coding assistants

This file is meant for **any** AI or automated coding tool (IDE agents, CLI assistants, etc.), not a single vendor.

**Always read** the Markdown files in [`.cursor/rules/`](.cursor/rules/) before non-trivial changes. They use a short YAML header plus body text; skip the header if your tool ignores it—the content is ordinary Markdown.

| File | Role |
|------|------|
| `convert-bolivar-overview.mdc` | Product context, routes, stack, where to extend (intended as *global* context for the repo). |
| `convert-bolivar-frontend.mdc` | `app/` and `components/` — RSC vs client, co-located types/CSS. |
| `convert-bolivar-lib-api.mdc` | `lib/` and `app/api/` — fetching, caching, API error shape, P2P proxy. |

Some tools auto-load `.cursor/rules/` when present; others only read `AGENTS.md`. If your environment does not pick up the `.mdc` files, open that folder manually or paste relevant excerpts into the session.
