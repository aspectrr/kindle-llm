import node from "@astrojs/node";
import { defineConfig } from "astro/config";

const siteUrl = process.env.SITE_URL || "http://localhost:3000";
const siteHost = new URL(siteUrl).hostname;

export default defineConfig({
	site: siteUrl,
	output: "server",
	adapter: node({ mode: "standalone" }),
	security: {
		allowedDomains: [{ hostname: siteHost }],
	},
});
