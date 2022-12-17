import {
  doc,
  DocumentReference,
  query,
  collection,
  orderBy,
  CollectionReference,
} from 'firebase/firestore';
import {
  useFirestore,
  useFirestoreCollection,
  useFirestoreDocData,
} from 'reactfire';
import { EventData, PostData, GuestData } from '../types/events';

export function useEvent(id: string) {
  const firestore = useFirestore();

  const eventRef = doc(firestore, 'events', id) as DocumentReference<EventData>;
  const postsRef = query(
    collection(firestore, 'events', id, 'posts'),
    orderBy('createdAt', 'desc'),
  ) as CollectionReference<PostData>;
  const guestsRef = query(
    collection(firestore, 'events', id, 'guests'),
    orderBy('createdAt', 'asc'),
  ) as CollectionReference<GuestData>;

  const { status, data: eventData } = useFirestoreDocData(eventRef, {
    idField: 'id',
  });
  const { data: postsData } = useFirestoreCollection(postsRef);
  const { data: guestsData } = useFirestoreCollection(guestsRef);

  return {
    status,
    eventData,
    guestsData,
    postsData,
  };
}
