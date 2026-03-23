import { getNewsBySlugRequest, getNewsListRequest } from '@/shared/api/news.api';
import { mapNewsDtoToEntity } from '../model/mappers';
import type { NewsArticle } from '../model/types';

export async function getNewsList(): Promise<NewsArticle[]> {
  const response = await getNewsListRequest();
  return response.data.map(mapNewsDtoToEntity);
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const response = await getNewsBySlugRequest(slug);

  if (!response.data) {
    return null;
  }

  return mapNewsDtoToEntity(response.data);
}