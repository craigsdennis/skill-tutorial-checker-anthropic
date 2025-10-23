# Tutorial Checker

An AI-powered tutorial quality reviewer that analyzes technical tutorials and creates comprehensive review documents.

## Overview

This agent uses Claude to read tutorials and assess their clarity, completeness, and usability. It generates detailed reviews including complexity ratings, prerequisite analysis, step-by-step breakdowns, and recommendations for improvement.

## Features

- **Automated Tutorial Analysis**: Reads and comprehensively analyzes technical tutorials
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

## Usage

### 1. Add a Tutorial

Place the tutorial content (in markdown format) into `tutorials/current.md`:

```bash
# Manually paste content, or use a tool to fetch it
cat your-tutorial.md > tutorials/current.md
```

### 2. Run the Tutorial Checker

```bash
npm start
```

The agent will:
1. Read the tutorial from `tutorials/current.md`
2. Analyze the content comprehensively
3. Generate a detailed review at `attempts/overview.md`

### 3. Review the Results

Check `attempts/overview.md` for the complete analysis including:
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
│       └── tutorial-checker/
│           └── SKILL.md           # Skill definition and instructions
├── src/
│   └── index.ts                   # Main agent script
├── tutorials/
│   └── current.md                 # Input tutorial (you provide this)
├── attempts/
│   └── overview.md               # Generated review (created by agent)
├── package.json
└── README.md
```

## Configuration

The agent is configured in `src/index.ts` with:

- **Allowed Tools**: Read, Write, Edit
- **Setting Sources**: user, local, project
- **Model**: Claude Sonnet 4.5 (via Agent SDK)

## Development

To modify the review format or analysis criteria:

1. Edit `.claude/skills/tutorial-checker/SKILL.md`
2. Update the review template and guidelines
3. Run `npm start` to test changes

## Requirements

- Node.js 18.0.0 or later
- Claude Agent SDK (installed via npm)
- Valid Anthropic API credentials

## License

ISC

## Author

Craig Dennis (craig@cloudflare.com) 