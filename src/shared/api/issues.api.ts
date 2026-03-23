import { mockIssues } from '@/data/mockIssues';
import { mockClient } from './client';

export async function getIssuesListRequest() {
  return mockClient(mockIssues);
}

export async function getIssueBySlugRequest(slug: string) {
  const issue = mockIssues.find((item) => item.slug === slug);
  return mockClient(issue ?? null);
}