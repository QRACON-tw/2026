import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response('Robots unavailable: Astro site is not configured.', { status: 500 });
  }

  const body = `User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', site).href}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
