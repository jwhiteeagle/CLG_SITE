import type { MetadataRoute } from 'next';

import { listCategorySlugs } from '@/lib/gallery';

const SITE_URL = 'https://www.chieflivegaming.com';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const categoryEntries = listCategorySlugs().map((category) => ({
    url: `${SITE_URL}/gallery/${category}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...categoryEntries,
    {
      url: `${SITE_URL}/commissions`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/links`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/paintfinity`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
