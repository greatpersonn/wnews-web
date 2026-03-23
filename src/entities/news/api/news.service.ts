import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/shared/config/firebase';
import { mapNewsDtoToEntity } from '../model/mappers';
import type { NewsArticle, NewsArticleDto } from '../model/types';

export async function getNewsList(): Promise<NewsArticle[]> {
  const snapshot = await getDocs(query(collection(db, 'news'), orderBy('publishedAt', 'desc')));

  return snapshot.docs.map((item) =>
    mapNewsDtoToEntity({
      id: item.id,
      ...(item.data() as Omit<NewsArticleDto, 'id'>),
    }),
  );
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const snapshot = await getDocs(
    query(collection(db, 'news'), where('slug', '==', slug)),
  );

  if (snapshot.empty) {
    return null;
  }

  const firstDoc = snapshot.docs[0];

  return mapNewsDtoToEntity({
    id: firstDoc.id,
    ...(firstDoc.data() as Omit<NewsArticleDto, 'id'>),
  });
}

export async function createNews(payload: Omit<NewsArticleDto, 'id'>) {
  await addDoc(collection(db, 'news'), payload);
}

export async function updateNews(documentId: string, payload: Omit<NewsArticleDto, 'id'>) {
  await updateDoc(doc(db, 'news', documentId), payload);
}

export async function deleteNews(documentId: string) {
  await deleteDoc(doc(db, 'news', documentId));
}

export async function getAllNewsSlugs(): Promise<string[]> {
  const items = await getNewsList();
  return items.map((item) => item.slug);
}