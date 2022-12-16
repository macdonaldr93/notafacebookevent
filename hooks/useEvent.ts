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
import { EventData, TimelineData, GuestData } from '../types/events';

export function useEvent(id: string) {
  const firestore = useFirestore();

  const eventRef = doc(firestore, 'events', id) as DocumentReference<EventData>;
  const timelineRef = query(
    collection(firestore, 'events', id, 'timeline'),
    orderBy('createdAt', 'desc'),
  ) as CollectionReference<TimelineData>;
  const guestsRef = query(
    collection(firestore, 'events', id, 'guests'),
    orderBy('createdAt', 'asc'),
  ) as CollectionReference<GuestData>;

  const { status, data: eventData } = useFirestoreDocData(eventRef, {
    idField: 'id',
  });
  const { data: timelineData } = useFirestoreCollection(timelineRef);
  const { data: guestsData } = useFirestoreCollection(guestsRef);

  return {
    status,
    eventData,
    guestsData,
    timelineData,
  };
}
