import { mockNews } from '@/data/mockNews';
import { mockClient } from './client';

export async function getNewsListRequest() {
  return mockClient(mockNews);
}

export async function getNewsBySlugRequest(slug: string) {
  const article = mockNews.find((item) => item.slug === slug);
  return mockClient(article ?? null);
}