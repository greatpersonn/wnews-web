import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { mockIssues } from '@/data/mockIssues';
import { env } from '@/shared/config/env';
import { db } from '@/shared/config/firebase';
import { mockClient } from './client';

export async function getIssuesListRequest() {
  if (env.apiMode === 'mock') {
    return mockClient(mockIssues);
  }

  const issuesCollection = collection(db, 'issues');
  const issuesQuery = query(issuesCollection, orderBy('publishedAt', 'desc'));
  const snapshot = await getDocs(issuesQuery);

  const data = snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));

  return { data };
}

export async function getIssueBySlugRequest(slug: string) {
  if (env.apiMode === 'mock') {
    const issue = mockIssues.find((item) => item.slug === slug);
    return mockClient(issue ?? null);
  }

  const issuesCollection = collection(db, 'issues');
  const issuesQuery = query(issuesCollection, where('slug', '==', slug));
  const snapshot = await getDocs(issuesQuery);

  if (snapshot.empty) {
    return { data: null };
  }

  const firstDoc = snapshot.docs[0];

  return {
    data: {
      id: firstDoc.id,
      ...firstDoc.data(),
    },
  };
}