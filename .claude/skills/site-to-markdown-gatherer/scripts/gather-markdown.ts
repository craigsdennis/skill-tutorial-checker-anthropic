import Cloudflare from "cloudflare";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));

const client = new Cloudflare({
  apiToken: process.env["CLOUDFLARE_API_TOKEN"],
});

const markdown = await client.browserRendering.markdown.create({
  account_id: process.env["CLOUDFLARE_ACCOUNT_ID"] as string,
  url: args.url,
});

console.log(markdown);