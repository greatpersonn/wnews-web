import { getIssueBySlugRequest, getIssuesListRequest } from '@/shared/api/issues.api';
import { mapIssueDtoToEntity } from '../model/mappers';
import type { NewspaperIssue } from '../model/types';

export async function getIssuesList(): Promise<NewspaperIssue[]> {
  const response = await getIssuesListRequest();
  return response.data.map(mapIssueDtoToEntity);
}

export async function getIssueBySlug(slug: string): Promise<NewspaperIssue | null> {
  const response = await getIssueBySlugRequest(slug);

  if (!response.data) {
    return null;
  }

  return mapIssueDtoToEntity(response.data);
}