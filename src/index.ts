#!/usr/bin/env node
import { query } from "@anthropic-ai/claude-agent-sdk";

/**
 * Tutorial Checker Agent
 *
 * This agent reads a tutorial from tutorials/current.md and creates a detailed review.
 * It uses the tutorial-checker skill to analyze the tutorial and generate a comprehensive review.
 */
async function main() {
  console.log("=".repeat(60));
  console.log("Tutorial Checker Agent");
  console.log("=".repeat(60));
  console.log("\nAnalyzing tutorial from: tutorials/current.md\n");

  try {
    // Run the agent using the query API
    // The /tutorial-checker skill will be invoked automatically
    for await (const message of query({
      prompt: "/tutorial-checker",
      options: {
        // Allow the agent to read, write, and edit files
        allowedTools: ["Read", "Write", "Edit"],
        // Load settings from all available sources
        settingSources: ["user", "local", "project"],
      },
    })) {
      // Stream output to console
      // The message structure from query() returns different types
      if (message && typeof message === "object") {
        // Handle different message types appropriately
        console.log(JSON.stringify(message));
      }
    }

    console.log("\n" + "=".repeat(60));
    console.log("Analysis Complete!");
    console.log("=".repeat(60));
    console.log("\nReview document saved to: attempts/overview.md");
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
