import type { APIRoute } from 'astro';
import { INDEXABLE, SITE_URL } from '../consts';

export const prerender = true;

export const GET: APIRoute = () => {
  const body = INDEXABLE
    ? `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap-index.xml\n`
    : 'User-agent: *\nDisallow: /\n';

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
