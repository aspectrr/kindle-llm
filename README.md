# kindle-llm

A reading companion for your Kindle. Paste a passage from a book, article, or paper and chat with an LLM about it.

Built for e-ink — serif fonts, black & white, ~16KB total on the client.

## How it works

1. **Paste** a passage into the reader panel
2. **Load** it — renders as formatted text
3. **Ask** questions — the passage is sent as context to the LLM
4. **Get answers** that reference what you're reading

Or just chat normally without pasting anything.

The reader panel collapses so you can focus on the conversation, and comes back when you need it.

## Stack

- **Astro** (SSR) — zero client JS framework
- **htmx** — partial HTML swaps, no full reloads
- **OpenAI-compatible API** — works with ZAI, OpenAI, or any compatible endpoint
- **Bun** — runtime
- **Fly.io** — deployment (free tier, auto-stops when idle)

## Getting started

```bash
bun install
cp .env.example .env   # add your API key
bun run dev
```

## Environment variables

| Variable          | Default                        | Description                    |
| ----------------- | ------------------------------ | ------------------------------ |
| `OPENAI_BASE_URL` | `https://api.z.ai/api/paas/v4` | OpenAI-compatible API endpoint |
| `OPENAI_API_KEY`  | —                              | Your API key                   |
| `MODEL`           | `gpt-4o-mini`                  | Model to use                   |

## Deploy to Fly.io

```bash
fly launch
fly secrets set OPENAI_API_KEY=your-key
fly secrets set OPENAI_BASE_URL=https://api.z.ai/api/paas/v4
fly deploy
```

Free tier: auto-stops when idle, auto-starts on request. Open the URL on your Kindle's browser and you're set.

## Project structure

```
src/
├── layouts/Layout.astro      # HTML shell, CSS, minimal JS
├── pages/
│   ├── index.astro            # Composes Reader + Chat
│   └── api/chat.ts            # htmx endpoint (returns HTML)
├── components/
│   ├── Reader.astro           # Paste/render text panel
│   └── Chat.astro             # Messages + input form
└── lib/llm.ts                 # OpenAI-compatible client
```

## Why

Got tired of reaching for my phone to look things up while reading. The Kindle browser is surprisingly capable now — just needs apps built for its constraints.

## License

MIT
