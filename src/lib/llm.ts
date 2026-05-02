import OpenAI from "openai";

function getClient() {
	return new OpenAI({
		baseURL: import.meta.env.OPENAI_BASE_URL || "https://api.z.ai/api/paas/v4",
		apiKey: import.meta.env.OPENAI_API_KEY,
	});
}

function getModel() {
	return import.meta.env.MODEL || "gpt-4o-mini";
}

export interface Message {
	role: "user" | "assistant";
	content: string;
}

export async function chat(
	message: string,
	history: Message[],
	readerContext: string,
): Promise<string> {
	const client = getClient();

	const systemParts = [
		"You are kindle-llm, a helpful reading companion on an e-reader.",
		"Be concise but thorough. Keep responses short enough to read on a small e-ink screen.",
		"Reference specific parts of the text when relevant.",
		"If asked to explain something, break it down clearly.",
	];

	if (readerContext.trim()) {
		systemParts.push(
			`\nThe user is reading the following text and may ask questions about it:\n---\n${readerContext}\n---`,
		);
	}

	const messages: OpenAI.ChatCompletionMessageParam[] = [
		{ role: "system", content: systemParts.join("\n") },
		...history.map((m) => ({
			role: m.role as "user" | "assistant",
			content: m.content,
		})),
		{ role: "user", content: message },
	];

	const completion = await client.chat.completions.create({
		model: getModel(),
		messages,
		max_tokens: 1024,
	});

	return (
		completion.choices[0].message.content ||
		"Sorry, I could not generate a response."
	);
}
