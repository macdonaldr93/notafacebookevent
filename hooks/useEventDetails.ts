import {
  query,
  collection,
  orderBy,
  CollectionReference,
} from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { PostData, GuestData } from '../types/events';
import { useEvent } from './useEvent';

export function useEventDetails(id: string) {
  const firestore = useFirestore();
  const { status, data: eventData } = useEvent(id);

  const postsRef = query(
    collection(firestore, 'events', id, 'posts'),
    orderBy('createdAt', 'desc'),
  ) as CollectionReference<PostData>;

  const guestsRef = query(
    collection(firestore, 'events', id, 'guests'),
    orderBy('createdAt', 'asc'),
  ) as CollectionReference<GuestData>;

  const { data: postsData } = useFirestoreCollectionData(postsRef, {
    idField: 'id',
  });
  const { data: guestsData } = useFirestoreCollectionData(guestsRef, {
    idField: 'id',
  });

  return {
    status,
    eventData,
    guestsData,
    postsData,
  };
}
