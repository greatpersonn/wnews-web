import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { mockNews } from '@/data/mockNews';
import { env } from '@/shared/config/env';
import { db } from '@/shared/config/firebase';
import { mockClient } from './client';

export async function getNewsListRequest() {
  if (env.apiMode === 'mock') {
    return mockClient(mockNews);
  }

  const newsCollection = collection(db, 'news');
  const newsQuery = query(newsCollection, orderBy('publishedAt', 'desc'));
  const snapshot = await getDocs(newsQuery);

  const data = snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));

  return { data };
}

export async function getNewsBySlugRequest(slug: string) {
  if (env.apiMode === 'mock') {
    const article = mockNews.find((item) => item.slug === slug);
    return mockClient(article ?? null);
  }

  const newsCollection = collection(db, 'news');
  const newsQuery = query(newsCollection, where('slug', '==', slug));
  const snapshot = await getDocs(newsQuery);

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