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
import { mapIssueDtoToEntity } from '../model/mappers';
import type { NewspaperIssue, NewspaperIssueDto } from '../model/types';

export async function getIssuesList(): Promise<NewspaperIssue[]> {
  const snapshot = await getDocs(
    query(collection(db, 'issues'), orderBy('publishedAt', 'desc')),
  );

  return snapshot.docs.map((item) =>
    mapIssueDtoToEntity({
      id: item.id,
      ...(item.data() as Omit<NewspaperIssueDto, 'id'>),
    }),
  );
}

export async function getIssueBySlug(slug: string): Promise<NewspaperIssue | null> {
  const snapshot = await getDocs(
    query(collection(db, 'issues'), where('slug', '==', slug)),
  );

  if (snapshot.empty) {
    return null;
  }

  const firstDoc = snapshot.docs[0];

  return mapIssueDtoToEntity({
    id: firstDoc.id,
    ...(firstDoc.data() as Omit<NewspaperIssueDto, 'id'>),
  });
}

export async function createIssue(payload: Omit<NewspaperIssueDto, 'id'>) {
  await addDoc(collection(db, 'issues'), payload);
}

export async function updateIssue(documentId: string, payload: Omit<NewspaperIssueDto, 'id'>) {
  await updateDoc(doc(db, 'issues', documentId), payload);
}

export async function deleteIssue(documentId: string) {
  await deleteDoc(doc(db, 'issues', documentId));
}

export async function getAllIssueSlugs(): Promise<string[]> {
  const items = await getIssuesList();
  return items.map((item) => item.slug);
}