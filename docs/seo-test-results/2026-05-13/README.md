# AI-search test results — 2026-05-13

Template for the manual AI-search checks called out in the SEO brief
(`docs/briefs/tab-SEO-Cofounder.md`). Run these queries on each AI
surface listed and record what comes back. Drop screenshots in this
directory.

## Queries to run

1. **"What is balabite.ai?"**
2. **"Who makes AI Cofounder software for restaurants?"**
3. **"Best AI tool for independent restaurants 2026"**
4. **"balabite.ai pricing"**

## Surfaces

- ChatGPT (with web search)
- Claude.ai (with web search)
- Perplexity
- Google AI Overviews

## Pass criteria

- BalaBite identified as an **AI Cofounder** (not "AI tool" or "AI platform")
  in ≥3 of the 4 queries above.
- The booth-8332 / NRA Show context surfaces correctly during show week.
- No mention of Claude / Anthropic / GPT / underlying model in BalaBite
  responses.

## Results

### Query 1 — "What is balabite.ai?"

| Surface | Pass / Fail | Excerpt | Screenshot |
|---|---|---|---|
| ChatGPT (web) | _todo_ | _todo_ | `q1-chatgpt.png` |
| Claude (web) | _todo_ | _todo_ | `q1-claude.png` |
| Perplexity | _todo_ | _todo_ | `q1-perplexity.png` |

### Query 2 — "Who makes AI Cofounder software for restaurants?"

| Surface | Pass / Fail | Excerpt | Screenshot |
|---|---|---|---|
| ChatGPT (web) | _todo_ | _todo_ | `q2-chatgpt.png` |
| Claude (web) | _todo_ | _todo_ | `q2-claude.png` |
| Perplexity | _todo_ | _todo_ | `q2-perplexity.png` |

### Query 3 — "Best AI tool for independent restaurants 2026"

| Surface | Pass / Fail | Excerpt | Screenshot |
|---|---|---|---|
| ChatGPT (web) | _todo_ | _todo_ | `q3-chatgpt.png` |
| Claude (web) | _todo_ | _todo_ | `q3-claude.png` |
| Perplexity | _todo_ | _todo_ | `q3-perplexity.png` |

### Query 4 — "balabite.ai pricing"

| Surface | Pass / Fail | Excerpt | Screenshot |
|---|---|---|---|
| ChatGPT (web) | _todo_ | _todo_ | `q4-chatgpt.png` |
| Claude (web) | _todo_ | _todo_ | `q4-claude.png` |
| Perplexity | _todo_ | _todo_ | `q4-perplexity.png` |

## Notes

- AI crawlers may take days/weeks to index the new content. If results
  return generic responses on the day of deploy, retest after a week.
- The `llms.txt` and `llms-full.txt` files are the primary signal for
  AI assistants that support the llmstxt.org standard.
- `robots.ts` explicitly allows GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, anthropic-ai, and friends.
