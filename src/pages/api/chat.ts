import type { APIRoute } from "astro";
import type { Message } from "../../lib/llm";
import { chat } from "../../lib/llm";

export const POST: APIRoute = async ({ request }) => {
	try {
		const formData = await request.formData();
		const message = (formData.get("message") as string) || "";
		const historyRaw = (formData.get("history") as string) || "[]";
		const context = (formData.get("context") as string) || "";

		if (!message.trim()) {
			return new Response(
				'<div class="msg msg-assistant">Please enter a message.</div>',
				{
					headers: { "Content-Type": "text/html" },
				},
			);
		}

		let history: Message[] = [];
		try {
			history = JSON.parse(historyRaw);
		} catch {
			history = [];
		}

		const response = await chat(message, history, context);

		const html = `
      <div class="msg msg-user" data-role="user" data-content="${attrEscape(message)}">
        <div class="msg-label">You</div>
        <div class="msg-content">${htmlEscape(message)}</div>
      </div>
      <div class="msg msg-assistant" data-role="assistant" data-content="${attrEscape(response)}">
        <div class="msg-label">kindle-llm</div>
        <div class="msg-content">${formatResponse(response)}</div>
      </div>
    `;

		return new Response(html, {
			headers: { "Content-Type": "text/html" },
		});
	} catch (err) {
		console.error("Chat error:", err);
		return new Response(
			'<div class="msg msg-assistant"><div class="msg-label">kindle-llm</div><div class="msg-content">Something went wrong. Please try again.</div></div>',
			{ headers: { "Content-Type": "text/html" } },
		);
	}
};

function htmlEscape(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function attrEscape(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\n/g, "&#10;");
}

function formatResponse(str: string): string {
	let html = htmlEscape(str);
	// Bold: **text**
	html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
	// Italic: *text*
	html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
	// Line breaks
	html = html.replace(/\n/g, "<br>");
	return html;
}
