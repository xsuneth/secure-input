import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: 'https://secure-input.vercel.app',
    sitemap: 'https://secure-input.vercel.app/sitemap.xml',
  };
}