import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/shared/config/firebase';
import type { AdItemDto } from '@/entities/ad/model/types';

export async function getAdsListRequest(): Promise<{ data: AdItemDto[] }> {
  const adsCollection = collection(db, 'ads');
  const adsQuery = query(
    adsCollection,
    where('isActive', '==', true),
    orderBy('priority', 'asc'),
    orderBy('publishedAt', 'desc'),
  );

  const snapshot = await getDocs(adsQuery);

  const data: AdItemDto[] = snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<AdItemDto, 'id'>),
  }));

  return { data };
}