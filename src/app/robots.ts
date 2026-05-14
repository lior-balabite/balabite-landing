import type { MetadataRoute } from 'next';

const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'CCBot',
  'cohere-ai',
  'Bytespider',
  'FacebookBot',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/booth-8332/qr'],
      },
      // Explicit allow for AI crawlers so they can index llms.txt + content
      ...AI_BOTS.map((bot) => ({
        userAgent: bot,
        allow: '/',
        disallow: ['/api/'],
      })),
    ],
    sitemap: 'https://www.balabite.ai/sitemap.xml',
    host: 'https://www.balabite.ai',
  };
}
