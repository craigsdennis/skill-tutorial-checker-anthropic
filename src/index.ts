#!/usr/bin/env node
import { query } from "@anthropic-ai/claude-agent-sdk";

/**
 * Recursively redacts environment variable values from an object
 * Only redacts values for env vars with names suggesting they're sensitive
 * @param obj - The object to redact values from
 * @returns A new object with env values replaced by [REDACTED]
 */
function redactEnvValues(obj: any): any {
  // Keywords that indicate a sensitive environment variable
  const sensitiveKeywords = [
    'KEY', 'TOKEN', 'SECRET', 'PASSWORD', 'API',
    'ACCOUNT', 'CREDENTIAL', 'AUTH', 'PRIVATE'
  ];

  // Only collect values from env vars with sensitive names
  const envValues = new Set(
    Object.entries(process.env)
      .filter(([key, value]) => {
        if (!value || value.length === 0) return false;
        const upperKey = key.toUpperCase();
        return sensitiveKeywords.some(keyword => upperKey.includes(keyword));
      })
      .map(([_, value]) => value)
  );

  function redact(value: any): any {
    if (typeof value === "string") {
      // Check if this string contains any env value and redact it
      let redacted = value;
      for (const envVal of envValues) {
        if (envVal && redacted.includes(envVal)) {
          redacted = redacted.replace(new RegExp(escapeRegExp(envVal), "g"), "[REDACTED]");
        }
      }
      return redacted;
    } else if (Array.isArray(value)) {
      return value.map(redact);
    } else if (typeof value === "object" && value !== null) {
      const result: any = {};
      for (const key in value) {
        result[key] = redact(value[key]);
      }
      return result;
    }
    return value;
  }

  return redact(obj);
}

/**
 * Escapes special regex characters in a string
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

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
First, use the skill markdown-fetch to fetch the content from: ${url}

Then, use the skill tutorial-checker to analyze the markdown file that was just created.
The markdown file will be in the fetched.md file in the root.

Current date is ${new Date().toDateString()}.
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
        // Redact any environment variable values before logging
        const redactedMessage = redactEnvValues(message);
        console.log(JSON.stringify(redactedMessage));
      }
    }

    console.log("\n" + "=".repeat(60));
    console.log("Analysis Complete!");
    console.log("=".repeat(60));
    console.log("\nReview document saved to: review.md");
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
