import node from "@astrojs/node";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: process.env.SITE_URL || "http://localhost:3000",
	output: "server",
	adapter: node({ mode: "standalone" }),
});
