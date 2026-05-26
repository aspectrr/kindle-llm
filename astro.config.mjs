import node from "@astrojs/node";
import { defineConfig } from "astro/config";

const siteUrl = process.env.SITE_URL || "http://localhost:3000";

export default defineConfig({
	site: siteUrl,
	output: "server",
	adapter: node({ mode: "standalone" }),
	security: {
		checkOrigin: false,
	},
});
