# Tutorial Checker

An AI-powered tutorial quality reviewer that fetches web tutorials using Cloudflare Browser Rendering and creates comprehensive review documents.

## Overview

This agent uses Claude with Cloudflare Browser Rendering to fetch tutorials from URLs and assess their clarity, completeness, and usability. It generates detailed reviews including complexity ratings, prerequisite analysis, step-by-step breakdowns, and recommendations for improvement.

## Features

- **Automatic Web Fetching**: Uses Cloudflare Browser Rendering to fetch tutorial content from any URL
- **Markdown Conversion**: Converts web pages to clean, readable markdown
- **Automated Tutorial Analysis**: Comprehensively analyzes technical tutorials
- **Complexity Rating**: Rates tutorials on a 1-10 scale for difficulty
- **Prerequisite Detection**: Identifies and documents required knowledge and tools
- **Step-by-Step Review**: Breaks down each tutorial section with detailed analysis
- **Issue Identification**: Flags unclear instructions, missing prerequisites, and errors
- **Improvement Recommendations**: Suggests specific enhancements and additional resources

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Cloudflare credentials:
   ```bash
   CLOUDFLARE_ACCOUNT_ID="your-account-id"
   CLOUDFLARE_API_TOKEN="your-api-token"
   ```

## Usage

Simply pass the URL of the tutorial you want to analyze:

```bash
npm start https://developers.cloudflare.com/ai-gateway/get-started/
```

The agent will:
1. Fetch the tutorial content using Cloudflare Browser Rendering
2. Convert it to markdown and save in `fetched/`
3. Analyze the content comprehensively
4. Generate a detailed review in `reviews/`

## Example

```bash
npm start https://developers.cloudflare.com/workers/get-started/guide/
```

Output files:
- `fetched/developers-cloudflare-com-workers-get-started-2025-10-23-164406.md`
- `reviews/developers-cloudflare-com-workers-get-started-review-2025-10-23-164530.md`

The review includes:
- Tutorial metadata (title, complexity, audience)
- Prerequisites assessment
- Step-by-step analysis
- Issues found
- Recommendations for improvement

## How It Works

The tutorial checker uses the Claude Agent SDK with a custom skill defined in `.claude/skills/tutorial-checker/SKILL.md`. The skill provides:

- Clear instructions for the AI agent
- Structured review template
- Guidelines for thorough analysis
- Best practices for educational content review

## Example Output

The generated review includes sections like:

```markdown
# Tutorial Review

**Tutorial Title**: Building Your First Cloudflare Worker

**Complexity**: 3/10

**Assumed Audience**: Beginner

**Prerequisites**:
- Node.js (version 16.17.0+) - [Install Node.js](https://nodejs.org/)
- Cloudflare account - [Sign up](https://dash.cloudflare.com/sign-up)
- Basic JavaScript knowledge

**Tutorial Objectives**:
- Create and deploy a Cloudflare Worker
- Understand Worker development workflow
- Learn basic Worker syntax

...
```

## Project Structure

```
tutorial-checker/
├── .claude/
│   └── skills/
│       ├── markdown-fetch/
│       │   └── SKILL.md           # Markdown fetching skill
│       └── tutorial-checker/
│           └── SKILL.md           # Tutorial analysis skill
├── src/
│   └── index.ts                   # Main agent script
├── fetched/                       # Fetched markdown files (gitignored)
├── reviews/                       # Generated reviews (gitignored)
├── .env                          # Cloudflare credentials (gitignored)
├── package.json
└── README.md
```

## Configuration

The agent is configured in `src/index.ts` with:

- **Allowed Tools**: Skill, Read, Write, Edit, WebSearch, Bash
- **Setting Sources**: project
- **Model**: Claude Sonnet 4.5 (via Agent SDK)

## Skills

This project uses two Claude Code skills:

### markdown-fetch
- Fetches web content using Cloudflare Browser Rendering
- Converts HTML to clean markdown
- Saves to `fetched/` directory

### tutorial-checker
- Analyzes tutorial content for quality and clarity
- Rates complexity and identifies prerequisites
- Generates detailed reviews in `reviews/` directory

## Development

To modify the skills:

**Tutorial analysis:**
1. Edit `.claude/skills/tutorial-checker/SKILL.md`
2. Update the review template and guidelines
3. Run `npm start <url>` to test changes

**Markdown fetching:**
1. Edit `.claude/skills/markdown-fetch/SKILL.md`
2. Update the API endpoint or processing logic
3. Run `npm start <url>` to test changes

## Requirements

- Node.js 18.0.0 or later
- Claude Agent SDK (installed via npm)
- Valid Anthropic API credentials
- Cloudflare account with Browser Rendering enabled
- Cloudflare API token with Browser Rendering permissions

## License

ISC

## Author

Craig Dennis (craig@cloudflare.com) 