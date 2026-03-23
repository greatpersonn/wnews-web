import { createSlug } from '@/shared/lib/slug';
import type { NewspaperIssue, NewspaperIssueDto } from './types';

export function mapIssueDtoToEntity(dto: NewspaperIssueDto): NewspaperIssue {
  return {
    id: dto.id,
    title: dto.title,
    slug: dto.slug ?? createSlug(dto.title),
    cover: dto.cover,
    description: dto.description,
    publishedAt: dto.publishedAt,
    issueNumber: dto.issueNumber,
    category: dto.category,
    pages: dto.pages.map((page) => ({
      id: page.id,
      image: page.image,
      title: page.title,
    })),
  };
}