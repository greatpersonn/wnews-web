import { createSlug } from '@/shared/lib/slug';
import type { NewsArticle, NewsArticleDto } from './types';

export function mapNewsDtoToEntity(dto: NewsArticleDto): NewsArticle {
  return {
    id: dto.id,
    title: dto.title,
    slug: dto.slug ?? createSlug(dto.title),
    excerpt: dto.excerpt,
    content: dto.content,
    image: dto.image,
    category: dto.category,
    author: dto.author,
    publishedAt: dto.publishedAt,
    featured: dto.featured ?? false,
  };
}