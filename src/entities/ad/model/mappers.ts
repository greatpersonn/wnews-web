import { createSlug } from '@/shared/lib/slug';
import type { AdItem, AdItemDto } from './types';

export function mapAdDtoToEntity(dto: AdItemDto): AdItem {
  return {
    id: dto.id,
    title: dto.title,
    slug: dto.slug ?? createSlug(dto.title),
    description: dto.description,
    image: dto.image,
    category: dto.category,
    contact: dto.contact,
    link: dto.link ?? '',
    publishedAt: dto.publishedAt,
    isActive: dto.isActive,
    priority: dto.priority,
  };
}