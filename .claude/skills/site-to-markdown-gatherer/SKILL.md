---
name: site-to-markdown-gatherer
description: Gathers a web page and converts it to markdown using Cloudflare Browser Rendering API.
---

# Instructions

When the user asks to fetch or convert a website to markdown:

1. Ask the user for the URL if not provided
2. Run: `npx tsx .claude/skills/site-to-markdown-gatherer/scripts/gather-markdown.ts --url=<URL>` (replace <URL> with the actual URL including https://)
3. The script will use Cloudflare's Browser Rendering API to fetch and convert the page
4. The markdown will be output to stdout
5. Present the markdown content to the user

## Environment Requirements
- Requires CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID to be set