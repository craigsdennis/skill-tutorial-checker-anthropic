#!/usr/bin/env node
import { query } from "@anthropic-ai/claude-agent-sdk";

/**
 * Tutorial Checker Agent
 *
 * This agent fetches a tutorial from a URL and creates a detailed review.
 * It uses markdown-fetch to retrieve the content, then tutorial-checker to analyze it.
 */
async function main() {
  // Get URL from command line arguments
  const url = process.argv[2];

  if (!url) {
    console.error("❌ Error: Please provide a URL");
    console.error("\nUsage: npm start <url>");
    console.error("Example: npm start https://developers.cloudflare.com/ai-gateway/get-started/");
    process.exit(1);
  }

  console.log("=".repeat(60));
  console.log("Tutorial Checker Agent");
  console.log("=".repeat(60));
  console.log(`\nFetching and analyzing tutorial from: ${url}\n`);

  try {
    // Run the agent using the query API
    // First fetch the markdown, then run the tutorial checker on the result
    const prompt = `
First, use /markdown-fetch to fetch the content from: ${url}

Then, use /tutorial-checker to analyze the markdown file that was just created.
The markdown file will be in the fetched/ directory.
`.trim();

    for await (const message of query({
      prompt,
      options: {
        // Allow the agent to read, write, and edit files
        allowedTools: ["Skill", "Read", "Write", "Edit", "WebSearch", "Bash"],
        // Load settings from all available sources
        settingSources: ["project"],
      },
    })) {
      // Stream output to console
      // The message structure from query() returns different types
      if (message && typeof message === "object") {
        // Handle different message types appropriately on the other end
        console.log(JSON.stringify(message));
      }
    }

    console.log("\n" + "=".repeat(60));
    console.log("Analysis Complete!");
    console.log("=".repeat(60));
    console.log("\nReview document saved to: reviews/");
  } catch (error) {
    console.error("\n❌ Failed to analyze tutorial:");
    console.error(error);
    process.exit(1);
  }
}

// Run the agent
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
