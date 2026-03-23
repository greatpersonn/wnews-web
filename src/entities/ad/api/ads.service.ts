import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/shared/config/firebase';
import { mapAdDtoToEntity } from '../model/mappers';
import type { AdItem, AdItemDto } from '../model/types';

export async function getAdsList(): Promise<AdItem[]> {
  const snapshot = await getDocs(
    query(
      collection(db, 'ads'),
      orderBy('priority', 'asc'),
      orderBy('publishedAt', 'desc'),
    ),
  );

  return snapshot.docs.map((item) =>
    mapAdDtoToEntity({
      id: item.id,
      ...(item.data() as Omit<AdItemDto, 'id'>),
    }),
  );
}

export async function getActiveAdsList(): Promise<AdItem[]> {
  const snapshot = await getDocs(
    query(
      collection(db, 'ads'),
      where('isActive', '==', true),
      orderBy('priority', 'asc'),
      orderBy('publishedAt', 'desc'),
    ),
  );

  return snapshot.docs.map((item) =>
    mapAdDtoToEntity({
      id: item.id,
      ...(item.data() as Omit<AdItemDto, 'id'>),
    }),
  );
}

export async function getAdBySlug(slug: string): Promise<AdItem | null> {
  const snapshot = await getDocs(
    query(collection(db, 'ads'), where('slug', '==', slug)),
  );

  if (snapshot.empty) {
    return null;
  }

  const firstDoc = snapshot.docs[0];

  return mapAdDtoToEntity({
    id: firstDoc.id,
    ...(firstDoc.data() as Omit<AdItemDto, 'id'>),
  });
}

export async function getAllAdSlugs(): Promise<string[]> {
  const items = await getAdsList();
  return items.map((item) => item.slug);
}

export async function createAd(payload: Omit<AdItemDto, 'id'>) {
  await addDoc(collection(db, 'ads'), payload);
}

export async function updateAd(documentId: string, payload: Omit<AdItemDto, 'id'>) {
  await updateDoc(doc(db, 'ads', documentId), payload);
}

export async function deleteAd(documentId: string) {
  await deleteDoc(doc(db, 'ads', documentId));
}