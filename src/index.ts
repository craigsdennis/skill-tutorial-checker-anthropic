import { query } from "@anthropic-ai/claude-agent-sdk";
import minimist from "minimist";

// Slice off the first two args (node + file path)
const args = minimist(process.argv.slice(2));
const tutorialUrl =
  args.url || "https://developers.cloudflare.com/workers/get-started/guide/";

for await (const message of query({
  prompt: `Perform a tutorial check on ${tutorialUrl}`,
  options: {
    allowedTools: ["WebFetch", "WebSearch", "Edit", "Write", "Read"]
  }
})) {
  console.log("message", JSON.stringify(message));
}
